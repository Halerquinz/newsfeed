import { AppDataSource } from "../configs/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Repository } from "typeorm";
// import { Follow } from '../entities/Follow';
import { validationResult, param } from "express-validator";

interface UserRequest {
  username: string;
  email: string;
  phone: string;
  password: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  coverPicture: string;
  livesin: string;
  about: string;
}

class UserController {
  async getUser(req: Request, res: Response) {
    const id = req.params.userId;
    try {
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(400).json({ status: "fail", msg: "User not found" });
      }
      const { password, ...orthers } = user;
      res.status(200).json({ status: "success", data: orthers });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async updateUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "fail", msg: errors.array()[0].msg });
    }
    const userRequest: UserRequest = req.body;
    const {
      username,
      email,
      phone,
      firstname,
      lastname,
      profilePicture,
      coverPicture,
      livesin,
      about,
    } = userRequest;
    const currentUserId = req.userId!;
    const id = req.params.userId;
    try {
      if (id !== currentUserId) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Not authorization " });
      }
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(400).json({ status: "fail", msg: "User not found" });
      }
      user.username = username;
      user.email = email;
      user.phone = phone;
      user.firstname = firstname;
      user.lastname = lastname;
      user.profilePicture = profilePicture;
      user.coverPicture = coverPicture;
      user.livesin = livesin;
      user.about = about;
      await userRepo.save(user);
      return res.status(200).json({ status: "success", data: user });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async softDelete(req: Request, res: Response) {
    const id = req.params.userId;
    const currentUserId = req.userId!;
    try {
      if (id !== currentUserId) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Not authorization " });
      }
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(400).json({ status: "fail", msg: "User not found" });
      }
      user.isDeleted = true;
      await userRepo.save(user);
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async forceDelete(req: Request, res: Response) {
    const id = req.params.userId;
    const currentUserId = req.userId!;
    try {
      if (id !== currentUserId) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Not authorization " });
      }
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(400).json({ status: "fail", msg: "User not found" });
      }
      await userRepo.delete(user.id);
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
}

export default new UserController();
