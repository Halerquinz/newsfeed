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
import path from "path";
import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";
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
          if (!activeUsers.some(user => user.userId === newUserId)) {
            activeUsers.push({
              userId: newUserId,
              socketId: socket.id,
            });
            console.log(activeUsers);
          }
          io.emit("get-users", activeUsers);
        });

        socket.on("send-message", data => {
          const { receiverId } = data;
          const user: ActiveUsers | undefined = activeUsers.find(
            user => user.userId === receiverId
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
          activeUsers.filter(user => user.socketId !== socket.id);
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
