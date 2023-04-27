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
    const id = req.params.userId;
    const currentUserId = req.userId!;
    try {
      if (id === currentUserId) {
        return res
          .status(403)
          .json({ status: "fail", msg: "Acttion forbidden" });
      }
      const followRepo: Repository<Follow> = await AppDataSource.getRepository(
        Follow
      );

      const userFollowUser: Follow[] = await followRepo.find({
        where: {
          userFollowedId: parseInt(id),
          userFollowingId: parseInt(currentUserId),
        },
      });

      if (userFollowUser.length !== 0) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Acttion forbidden" });
      }
      console.log(id, currentUserId);

      const newFollow: Follow = await new Follow();
      newFollow.userFollowedId = parseInt(id);
      newFollow.userFollowingId = parseInt(currentUserId);
      await followRepo.save(newFollow);

      res.status(200).json({ status: "success", data: newFollow });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      console.log(error);
      res.status(500).json({ status: "fail", msg });
    }
  }

  async unFollowUser(req: Request, res: Response) {
    const id = req.params.userId;
    const currentUserId = req.userId!;
    try {
      if (id === currentUserId) {
        return res
          .status(403)
          .json({ status: "fail", msg: "Acttion forbidden" });
      }
      const followRepo: Repository<Follow> = await AppDataSource.getRepository(
        Follow
      );
      const userFollowUser: Follow[] = await followRepo.find({
        where: {
          userFollowedId: parseInt(id),
          userFollowingId: parseInt(currentUserId),
        },
      });
      if (userFollowUser.length === 0) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Acttion forbidden" });
      }
      await followRepo.remove(userFollowUser[0]);
      res.status(200).json({ status: "success", data: userFollowUser[0] });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async getUserFollow(req: Request, res: Response) {
    const userId = req.userId;
    try {
      const followingQuery = `SELECT u.id, u.username, u.firstname, u.lastname, u.profilePicture from follows f inner join users u on u.id = f.userFollowedId where userFollowingId = ${userId}`;
      const followedQuery = `SELECT u.id, u.username, u.firstname, u.lastname, u.profilePicture from follows f inner join users u on u.id = f.userFollowingId where userFollowedId = ${userId}`;

      let following = await AppDataSource.query(followingQuery);
      let followed = await AppDataSource.query(followedQuery);

      following = following.map((u: any) => ({ ...u, youAreFollowing: true }));
      followed = followed.map((u: any) => ({ ...u, youAreFollowing: true }));

      res
        .status(200)
        .json({ status: "success", data: { following, followed } });
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
