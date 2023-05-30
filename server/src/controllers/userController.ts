import { AppDataSource } from "../configs/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Sex, User } from "../entities/User";
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
  sex: Sex;
  dateOfBirth: string;
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
      res.status(200).json({
        status: "success",
        data: {
          ...orthers,
        },
      });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async getUserWithFollowInfo(req: Request, res: Response) {
    const currentUserId = req.userId;
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
      const youAreFollowing = await AppDataSource.getRepository(
        "follows"
      ).findOne({
        where: {
          userFollowingId: Number(currentUserId),
          userFollowedId: Number(id),
        },
      });
      const followsYou = await AppDataSource.getRepository("follows").findOne({
        where: {
          userFollowingId: Number(id),
          userFollowedId: Number(currentUserId),
        },
      });

      res.status(200).json({
        status: "success",
        data: {
          ...orthers,
          youAreFollowing: !!youAreFollowing,
          followsYou: !!followsYou,
        },
      });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const users = await userRepo.find({
        select: {
          id: true,
          username: true,
          firstname: true,
          lastname: true,
          profilePicture: true,
        },
      });
      return res.status(200).json({ status: "success", data: users });
    } catch {
      return res.status(500).json({ status: "fail", msg: "error" });
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
      email,
      phone,
      firstname,
      lastname,
      profilePicture,
      coverPicture,
      livesin,
      about,
      sex,
      dateOfBirth,
    } = userRequest;
    const currentUserId = Number(req.userId!);
    const id = Number(req.params.userId);
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
        where: { id },
      });
      if (!user) {
        return res.status(400).json({ status: "fail", msg: "User not found" });
      }
      user.email = email;
      user.phone = phone;
      user.firstname = firstname;
      user.lastname = lastname;
      user.profilePicture = profilePicture;
      user.coverPicture = coverPicture;
      user.livesin = livesin;
      user.about = about;
      user.sex = sex;
      user.dateOfBirth = dateOfBirth;
      await userRepo.save(user);
      return res.status(200).json({ status: "success" });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async searchUsers(req: Request, res: Response) {
    try {
      const keyWord = req.header("text");

      const users =
        await AppDataSource.query(`SELECT u.id, u.username, u.firstname, u.lastname, u.profilePicture
         FROM users u
          WHERE (lastname Like '%${keyWord}%' or firstname Like '%${keyWord}%' or username Like '%${keyWord}%'
)`);

      return res.status(200).json({ status: "success", data: users });
    } catch {
      return res.status(500).json({ status: "fail", msg: "error" });
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
