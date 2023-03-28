import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { Like } from "../entities/Like";
import { Chat } from "../entities/Chat";
import { Message } from "../entities/Message";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.PORT!),
  username: "root",
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Post, Comment, Like, Chat, Message],
});
