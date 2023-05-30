import express, { Request, Response } from "express";
import { AppDataSource } from "./configs/db";
import http from "http";
import cors from "cors";
import multer from "multer";
import { multerConfig } from "./configs/multer";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import followRoute from "./routes/followRoute";
import postRoute from "./routes/postRoute";
import chatRoute from "./routes/chatRoute";
import messageRoute from "./routes/messageRoute";
import commentRoute from "./routes/commentRoute";
import { verify } from "jsonwebtoken";
import path from "path";
import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";
import { resolveSoa } from "dns";
import isAuth from "./middlewares/isAuth";
import { Repository } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = 5000;
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(
  multer({
    storage: multerConfig.storage,
    fileFilter: multerConfig.fileFilter,
  }).single("image")
);
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/follow", followRoute);
app.use("/post", postRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/comment", commentRoute);
app.get("/refresh_token", isAuth, async (req, res) => {
  if (req.userId) {
    const id = req.userId;
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
});

interface ActiveUsers {
  userId: number;
  socketId: string;
}

let activeUsers: ActiveUsers[] = [];

const startApp = async () => {
  try {
    const connection = await AppDataSource.initialize();
    if (connection) {
      console.log("Connect db success");
      await server.listen(PORT, (): void => {
        console.log(`Server is running on port: ${PORT}`);
      });
      io.on("connection", (socket: Socket) => {
        console.log("User is connected ", activeUsers);
        socket.on("new-user-add", (newUserId: number) => {
          console.log("newUserId: ", newUserId);
          if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
              userId: newUserId,
              socketId: socket.id,
            });
            console.log(activeUsers);
          }
          io.emit("get-users", activeUsers);
        });

        socket.on("send-message", (data) => {
          const { receiverId } = data;
          const user: ActiveUsers | undefined = activeUsers.find(
            (user) => user.userId === receiverId
          );
          console.log(`Sending from socket to: ${receiverId}`);
          console.log(data);
          console.log("user", user);
          if (user) {
            console.log(`usersocketid: ${user.socketId}`);
            io.to(user.socketId).emit("receive-message", data);
          }
        });

        socket.on("disconnect", () => {
          activeUsers.filter((user) => user.socketId !== socket.id);
          console.log("User is disconnected ", activeUsers);
          io.emit("get-users", activeUsers);
        });
      });
    } else {
      console.log("Connect db fail");
    }
  } catch (error) {
    console.log(error);
    console.log("Connect db fail");
  }
};

startApp();
// const startApp = async () => {
//   try {
//     const connection = await AppDataSource.initialize();
//     if (connection) {
//       console.log("Connect db success");
//       await server.listen(PORT, (): void => {
//         console.log(`Server is running on port: ${PORT}`);
//       });
//       io.on("connection", (socket: Socket) => {
//         console.log("User is connected ", activeUsers);
//         socket.on("new-user-add", (newUserId: number) => {
//           console.log("newUserId: ", newUserId);
//           if (!activeUsers.some((user) => user.userId === newUserId)) {
//             activeUsers.push({
//               userId: newUserId,
//               socketId: socket.id,
//             });
//             console.log(activeUsers);
//           }
//           io.emit("get-users", activeUsers);
//         });

//         socket.on("send-message", (data) => {
//           const { receiverId } = data;
//           const user: ActiveUsers | undefined = activeUsers.find(
//             (user) => user.userId === receiverId
//           );
//           console.log(`Sending from socket to: ${receiverId}`);
//           console.log(data);
//           console.log("user", user);
//           if (user) {
//             console.log(`usersocketid: ${user.socketId}`);
//             io.to(user.socketId).emit("receive-message", data);
//           }
//         });

//         socket.on("disconnect", () => {
//           activeUsers.filter((user) => user.socketId !== socket.id);
//           console.log("User is disconnected ", activeUsers);
//           io.emit("get-users", activeUsers);
//         });
//       });
//     } else {
//       console.log("Connect db fail");
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("Connect db fail");
//   }
// };

// startApp();
