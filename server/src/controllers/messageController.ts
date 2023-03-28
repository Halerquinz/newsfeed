import { AppDataSource } from "../configs/db";
import { Request, Response } from "express";
import { Message } from "../entities/Message";
import { Repository } from "typeorm";
import { validationResult } from "express-validator";
// import { Chat } from '../entities/Chat'
// import { io } from '../index'

interface MessageRequest {
  text: string;
  chatId: string;
}
class ChatController {
  async addMessage(req: Request, res: Response) {
    const userId = req.userId!;
    const messageRequest: MessageRequest = req.body;
    const { text, chatId } = messageRequest;
    try {
      const messageRepo: Repository<Message> =
        await AppDataSource.getRepository(Message);
      const newMessage: Message = await new Message();
      newMessage.chatId = parseInt(chatId);
      newMessage.senderId = parseInt(userId);
      newMessage.text = text;
      await newMessage.save();
      res.status(200).json({ status: "success", data: newMessage });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async getMessages(req: Request, res: Response) {
    const chatId = req.params.chatId;
    try {
      const messageRepo: Repository<Message> =
        await AppDataSource.getRepository(Message);
      const messages: Message[] = await messageRepo.find({
        where: { chatId: parseInt(chatId) },
      });
      if (messages.length === 0) {
        return res.status(200).json({ status: "no data", msg: "No message" });
      }
      res.status(200).json({ status: "success", data: messages });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
}

export default new ChatController();
