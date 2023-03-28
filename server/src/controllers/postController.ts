import { AppDataSource } from '../configs/db'
import { Request, Response } from 'express'
import { BaseEntity, Repository } from 'typeorm'
import { Post } from '../entities/Post'
import { User } from '../entities/User'
import { Follow } from '../entities/Follow'
import { validationResult, param } from 'express-validator'

interface PostRequest {
    desc: string
    image: string
}

class PostController {
    async createPost(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg })
        }
        const postRequest: PostRequest = req.body
        const { desc, image } = postRequest
        const currentUserId = req.userId!
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user: User | null = await userRepo.findOne({ where: { id: parseInt(currentUserId) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'Not authoriztion'})
            }
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const newPost: Post = await new Post()
            newPost.desc = desc
            newPost.image = image
            newPost.user = user
            await postRepo.save(newPost)
            res.status(201).json({ status: 'success', data: newPost })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async getPost(req: Request, res: Response) {
        const postId = req.params.postId
        try {
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const post: Post | null = await postRepo.findOne({
                relations: {
                    user: true,
                    likes: true
                }, 
                where: { 
                    id: parseInt(postId), 
                }
            })
            if (!post) {
                return res.status(400).json({ status: 'fail', msg: 'Post not found' })
            } 
            res.status(200).json({ status: 'success', data: post })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async getPosts(req: Request, res: Response) {
        try {
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const posts: Post[] = await postRepo.find({
                relations: {
                    user: true,
                    likes: true
                }
            })
            if (posts.length === 0) {
                return res.status(200).json({ status: 'success', data: 'Posts list is empty' })
            } 
            res.status(200).json({ status: 'success', data: posts })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    // async getTimelinePost (req: Request, res: Response) {
    //     const currentUserId = '2'
    //     try {
    //         const followRepo: Repository<Follow> = await AppDataSource.getRepository(Follow)
    //         const userFollowing: Follow[] = await followRepo.find({ where: { userFollowing: parseInt(currentUserId) }})
    //         const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
    //         const postList: [Post[]] =[[]]
    //         userFollowing.forEach(async u => {
    //             const posts: Post[] = await postRepo.find({
    //                 relations: {
    //                     user: true,
    //                     likes: true
    //                 },
    //                 where: {
    //                     userId: u.userFollowed
    //                 }
    //             })
    //             if (posts.length === 0) {
    //                 return res.status(200).json({ status: 'success', data: 'Posts list is empty' })
    //             } 
    //             postList.push(posts)
    //         })
    //         res.status(200).json({ status: 'success', data: postList })
            
    //     } catch (error) {
    //         let msg
    //         if (error instanceof Error) {
    //             msg = error.message
    //         }
    //         res.status(500).json({ status: 'fail', msg })
    //     }
    // }


    async getPostsOfUser(req: Request, res: Response) {
        const userId = req.params.userId
        try {
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const posts: Post[] = await postRepo.find({
                relations: {
                    user: true,
                    likes: true
                },
                where: { 
                    userId: parseInt(userId) 
                }
            })
            if (posts.length === 0) {
                return res.status(200).json({ status: 'success', data: 'The user has no posts'})
            }
            res.status(201).json({ status: 'success', data: posts })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async updatePost(req: Request, res: Response) {
        const postRequest: PostRequest = req.body
        const { desc, image } = postRequest
        const currentUserId = req.userId!
        const postId = req.params.postId
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user: User | null = await userRepo.findOne({ where: { id: parseInt(currentUserId) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'Not authoriztion'})
            }
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const post = await postRepo.findOne({
                relations: {
                    user: true,
                    likes: true
                },
                where: {
                    id: parseInt(postId),
                    userId: parseInt(currentUserId)
                }
            })
            if (!post) {
                return res.status(200).json({ status: 'fail', msg: 'Acttion forbidden'})
            }
            post.desc = desc
            post.image = image
            await postRepo.save(post)
            res.status(200).json({ status: 'success', data: post })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async deletePost(req: Request, res: Response) {
        const currentUserId = req.userId!
        const postId = req.params.postId
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user: User | null = await userRepo.findOne({ where: { id: parseInt(currentUserId) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'Not authoriztion'})
            }
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const post = await postRepo.findOne({
                relations: {
                    user: true,
                    likes: true
                }, 
                where: { 
                    id: parseInt(postId), 
                }
            })
            if (!post) {
                return res.status(400).json({ status: 'fail', msg: 'Post not found' })
            } 
            await postRepo.delete({ id: parseInt(postId)})
            res.status(200).json({ status: 'success', data: post })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}

export default new PostController()