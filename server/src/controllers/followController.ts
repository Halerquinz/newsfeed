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
      const userFollowUser = await Follow.findOne({
        where: {
          userFollowedId: parseInt(id),
          userFollowingId: parseInt(currentUserId),
        },
      });
      let followResult: Follow;

      if (!userFollowUser) {
        followResult = await new Follow();
        followResult.userFollowedId = parseInt(id);
        followResult.userFollowingId = parseInt(currentUserId);
        await followRepo.save(followResult);
        return res.status(200).json({ status: "success", data: "follow" });
      } else {
        followResult = await followRepo.remove(userFollowUser);
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
}

export default new FollowController();
