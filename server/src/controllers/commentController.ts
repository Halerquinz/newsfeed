import { AppDataSource } from "../configs/db";
import { Request, Response } from "express";
import { Comment } from "../entities/Comment";
import { Repository } from "typeorm";
import { validationResult } from "express-validator";
// import { Chat } from '../entities/Chat'
// import { io } from '../index'

interface CommentRequest {
  text: string;
}
class CommentController {
  async addComment(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const postId = req.body.postId;
      const comment = req.body.comment;
      // const commentRepo: Repository<Comment> =
      //   await AppDataSource.getRepository(Comment);
      // const newComment: Comment = await new Comment();
      // newComment.postId = Number(postId)!;
      // newComment.userId = Number(userId)!;
      // newComment.text = comment!;
      // await newComment.save();
      const firstQuery = `insert into comments(postId, userId, text) values(${postId}, ${userId}, "${comment}")`;
      const secondQuery = `
        update posts
        set commentCounts = commentCounts + 1
        where id = ${postId}
      `;
      await AppDataSource.transaction(async (tm) => {
        await tm.query(firstQuery);
        await tm.query(secondQuery);
      });
      res.status(200).json({ status: "success", data: true });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }

    // const userId = req.userId!;
    // const postId = req.params.postId;
    // const commentRequest: CommentRequest = req.body;
    // const { text } = commentRequest;
    // try {
    //   const commentRepo: Repository<Comment> =
    //     await AppDataSource.getRepository(Comment);
    //   const newComment: Comment = await new Comment();
    //   newComment.postId = parseInt(postId);
    //   newComment.userId = parseInt(userId);
    //   newComment.text = text;
    //   await newComment.save();
    //   res.status(201).json({ status: "success", data: newComment });
    // } catch (error) {
    //   let msg;
    //   if (error instanceof Error) {
    //     msg = error.message;
    //   }
    //   res.status(500).json({ status: "fail", msg });
    // }
  }

  async getComments(req: Request, res: Response) {
    const postId = req.params.postId;
    try {
      const queryString = `
      select c.*, u.username, u.firstname, u.lastname, u.profilePicture from comments c inner join users u on u.id = c.userId where postId = ${postId}
      `;
      const comments = await AppDataSource.query(queryString);
      console.log(comments);
      // const commentRepo: Repository<Comment> =
      //   await AppDataSource.getRepository(Comment);

      // const comments: Comment[] = await commentRepo.find({
      //   where: { postId: parseInt(postId) },
      // });
      // if (comments.length === 0) {
      //   return res.status(200).json({
      //     status: "no data",
      //     msg: "Be the first to comment on this post",
      //   });
      // }
      res.status(200).json({ status: "success", data: comments });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async updateComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    const commentRequest: CommentRequest = req.body;
    const { text } = commentRequest;
    try {
      const commentRepo: Repository<Comment> =
        await AppDataSource.getRepository(Comment);
      const comment: Comment | null = await commentRepo.findOne({
        relations: { user: true },
        where: { id: parseInt(commentId) },
      });
      if (!comment) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Comment not found" });
      }
      comment.text = text;
      await comment.save();
      res.status(200).json({ status: "success", data: comment });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    try {
      const commentRepo: Repository<Comment> =
        await AppDataSource.getRepository(Comment);

      const comment: Comment | null = await commentRepo.findOne({
        relations: { user: true },
        where: { id: parseInt(commentId) },
      });
      if (!comment) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Comment not found" });
      }
      res.status(200).json({ status: "success", data: comment });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
}

export default new CommentController();
