import { AppDataSource } from '../configs/db'
import { Request, Response } from 'express'
import { Comment } from '../entities/Comment'
import { Repository } from 'typeorm'
import { validationResult } from 'express-validator'
// import { Chat } from '../entities/Chat'
// import { io } from '../index'

interface CommentRequest {
    text: string,
}
class CommentController {
    async addComment(req: Request, res: Response) {
        const userId = req.userId!
        const postId = req.params.postId
        const commentRequest: CommentRequest = req.body
        const { text } = commentRequest
        try {
            const commentRepo: Repository<Comment> = await AppDataSource.getRepository(Comment)
            const newComment: Comment = await new Comment()
            newComment.postId = parseInt(postId)
            newComment.userId = parseInt(userId)
            newComment.text = text
            await newComment.save()
            res.status(201).json({ status: 'success', data: newComment})
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async getComments(req: Request, res: Response) {
        const postId = req.params.postId
        try {
            const commentRepo: Repository<Comment> = await AppDataSource.getRepository(Comment)

            const comments: Comment[] = await commentRepo.find({ where: { postId: parseInt(postId) } })
            if (comments.length === 0) {
                return res.status(200).json({ status: 'no data', msg: 'Be the first to comment on this post' })
            }
            res.status(200).json({ status: 'success', data: comments })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async updateComment(req: Request, res: Response) {
        const commentId = req.params.commentId
        const commentRequest: CommentRequest = req.body
        const { text } = commentRequest
        try {
            const commentRepo: Repository<Comment> = await AppDataSource.getRepository(Comment)
            const comment: Comment | null = await commentRepo.findOne({ 
                relations: { user: true },
                where: { id: parseInt(commentId) } 
            })
            if (!comment) {
                return res.status(400).json({ status: 'fail', msg: 'Comment not found' })
            }
            comment.text = text
            await comment.save()
            res.status(200).json({ status: 'success', data: comment})
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async deleteComment(req: Request, res: Response) {
        const commentId = req.params.commentId
        try {
            const commentRepo: Repository<Comment> = await AppDataSource.getRepository(Comment)

            const comment: Comment | null = await commentRepo.findOne({ 
                relations: { user: true },
                where: { id: parseInt(commentId) } 
            })
            if (!comment) {
                return res.status(400).json({ status: 'fail', msg: 'Comment not found' })
            }
            res.status(200).json({ status: 'success', data: comment})
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}

export default new CommentController()
