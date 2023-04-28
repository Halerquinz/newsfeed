import { AppDataSource } from "../configs/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { Follow } from "../entities/Follow";

interface FollowRequest {
  currentUserId: string;
}

class FollowController {
  async followUser(req: Request, res: Response) {
    const id = Number(req.params.userId);
    const currentUserId = Number(req.userId!);
    try {
      if (id === currentUserId) {
        return res
          .status(403)
          .json({ status: "fail", msg: "Acttion forbidden" });
      }
      const followRepo: Repository<Follow> = await AppDataSource.getRepository(
        Follow
      );
      const userFollowUser = await Follow.findOne({
        where: {
          userFollowedId: id,
          userFollowingId: currentUserId,
        },
      });
      let followResult: Follow;

      if (!userFollowUser) {
        followResult = await new Follow();
        followResult.userFollowedId = id;
        followResult.userFollowingId = currentUserId;
        const result = await followRepo.save(followResult);

        const updateFollowingCount = `update users set followingCount = followingCount + 1 where id = ${currentUserId}`;
        const updateFollowerCount = `update users set followerCount = followerCount + 1 where id = ${id}`;
        await AppDataSource.transaction(async (tm) => {
          await tm.query(updateFollowingCount);
          await tm.query(updateFollowerCount);
        });
        return res.status(200).json({ status: "success", data: "follow" });
      } else {
        followResult = await followRepo.remove(userFollowUser);
        const updateFollowingCount = `update users set followingCount = followingCount - 1 where id = ${currentUserId}`;
        const updateFollowerCount = `update users set followerCount = followerCount - 1 where id = ${id}`;
        await AppDataSource.transaction(async (tm) => {
          await tm.query(updateFollowingCount);
          await tm.query(updateFollowerCount);
        });
        return res.status(200).json({ status: "success", data: "unfollow" });
      }
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async getFollowing(req: Request, res: Response) {
    const userId = req.params.userId;
    const currentUserId = req.userId;
    try {
      const followingQuery = `SELECT u.id, u.username, u.firstname, u.lastname, u.profilePicture,
      (select userFollowingId from follows where userFollowedId = f.userFollowedId
      and userFollowingId = ${currentUserId}) youAreFollowing
      from follows f
      inner join users u on u.id = f.userFollowedId
      where userFollowingId = ${userId}`;
      let following = await AppDataSource.query(followingQuery);

      // following = following.map((u: any) => ({ ...u, youAreFollowing: true }));

      res.status(200).json({ status: "success", data: { following } });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async getFollowed(req: Request, res: Response) {
    const userId = req.params.userId;
    const currentUserId = req.userId;
    try {
      const followedQuery = `SELECT u.id, u.username, u.firstname, u.lastname, u.profilePicture,
      (select userFollowingId from follows where userFollowedId = f.userFollowingId
      and userFollowingId = ${currentUserId}) youAreFollowing
      from follows f
      inner join users u on u.id = f.userFollowingId
      where userFollowedId = ${userId}`;
      console.log(followedQuery);

      let followed = await AppDataSource.query(followedQuery);

      res.status(200).json({ status: "success", data: { followed } });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
}

export default new FollowController();
