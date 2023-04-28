import { AppDataSource } from "../configs/db";
import { Request, Response, query } from "express";
import { BaseEntity, Repository } from "typeorm";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Follow } from "../entities/Follow";
import { validationResult, param } from "express-validator";
import { convertTZ, formatToDbDate } from "../ultil/convertTZ";
import { where } from "sequelize";
import { createQuery } from "mysql2/typings/mysql/lib/Connection";

interface PostRequest {
  description: string;
  image: string;
}

class PostController {
  async createPost(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "fail", msg: errors.array()[0].msg });
    }
    const postRequest: PostRequest = req.body;
    const image = req.file?.path!;
    const { description } = postRequest;
    const currentUserId = req.userId!;
    try {
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(currentUserId) },
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Not authoriztion" });
      }
      const postRepo: Repository<Post> = await AppDataSource.getRepository(
        Post
      );
      const newPost: Post = await new Post();
      newPost.description = description;
      newPost.image = image;
      newPost.user = user;
      await postRepo.save(newPost);
      res.status(201).json({ status: "success", data: newPost });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
      // const postRepo: Repository<Post> = await AppDataSource.getRepository(
      //   Post
      // );
      // const post: Post | null = await postRepo.findOne({
      //   relations: ["user", "likes", "likes.user", "comments", "comments.user"],
      //   where: {
      //     id: parseInt(postId),
      //   },
      // });
      // const comment = await AppDataSource.getRepository("comments").findOne({
      //   relations: { user: true },
      //   where: { postId: parseInt(postId) },
      // });
      const getPostQuery = `select p.*, u.username, u.firstname, u.lastname, u.profilePicture, (select userId from likes where userId = ${userId} and postId = p.id) likeStatus from posts p inner join users u on p.id = ${postId} and u.id = p.userId`;
      const getCommentQuery = `select c.id, c.text, c.userId, c.postId, c.createdDate, c.updatedDate, u.username, u.profilePicture from comments c inner join users u on c.userId = u.id where c.postId = ${postId} order by c.createdDate desc`;
      const getLikeQuery = `select l.*,  u.username, u.profilePicture from likes l inner join users u on l.userId = u.id where l.postId = ${postId}`;

      const post = await AppDataSource.query(getPostQuery);
      const likes = await AppDataSource.query(getLikeQuery);
      const comments = await AppDataSource.query(getCommentQuery);

      const data = {
        post: { ...post[0] },
        likes,
        comments,
      };

      res.status(200).json({ status: "success", data });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  // cursor pagination =)) i think that
  async getPosts(req: Request, res: Response) {
    try {
      const userId = req.userId;
      let cursor = req.get("cursor");
      const limit = Number(req.get("limit"));
      const limitPlusOne = limit + 1;
      if (cursor && cursor !== "") {
        cursor = formatToDbDate(convertTZ(cursor));
      }

      const queryString = `
      select p.*, u.username, u.firstname, u.lastname, u.profilePicture,
      (select userId from likes where userId = ${userId} and postId = p.id) likeStatus
      from posts p
      inner join users u on u.id = p.userId
      ${cursor ? `where p.createdDate < "${cursor}"` : ""}
      order by p.createdDate DESC
      limit ${limitPlusOne}
      `;
      const posts = await AppDataSource.query(queryString);

      // const qb = await AppDataSource.getRepository(Post)
      //   .createQueryBuilder("p")
      //   .orderBy("p.createdDate", "DESC")
      //   .take(limitPlusOne);

      // if (cursor && cursor !== "") {
      //   qb.where("p.createdDate < :cursor", {
      //     cursor: formatToDbDate(convertTZ(cursor)),
      //   });
      // }
      // const posts = await qb.getMany();

      res.status(200).json({
        status: "success",
        data: {
          data: posts.slice(0, limit!),
          nextCursor:
            posts.length === limitPlusOne
              ? posts[posts.length - 1 - 1].createdDate
              : null,
        },
      });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }

    // try {
    //   const postRepo: Repository<Post> = await AppDataSource.getRepository(
    //     Post
    //   );
    //   const posts: Post[] = await postRepo.find({
    //     relations: {
    //       user: true,
    //       likes: true,
    //     },
    //   });
    //   if (posts.length === 0) {
    //     return res
    //       .status(200)
    //       .json({ status: "success", data: "Posts list is empty" });
    //   }
    //   res.status(200).json({ status: "success", data: posts });
    // } catch (error) {
    //   let msg;
    //   if (error instanceof Error) {
    //     msg = error.message;
    //   }
    //   res.status(500).json({ status: "fail", msg });
    // }
  }
  async likePost(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const postId = req.get("postId");
      const isLike = await AppDataSource.getRepository("likes").findOne({
        where: { userId, postId },
      });

      const firstQuery = `
        insert into likes (userId, postId) values(${userId}, ${postId})
      `;
      const secondQuery = `
      update posts set likeCounts = likeCounts + 1 where id = ${postId}
      `;
      const posts = await AppDataSource.transaction(async (tm) => {
        await tm.query(firstQuery);
        await tm.query(secondQuery);
      });

      res.status(200).json({
        status: "success",
        data: true,
      });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
  async unlikePost(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const postId = req.get("postId");
      const isLike = await AppDataSource.getRepository("likes").findOne({
        where: { userId, postId },
      });
      const firstQuery = `delete from likes where postId = ${postId} and userId = ${userId}`;
      const secondQuery = `
      update posts set likeCounts = likeCounts - 1 where id = ${postId}
      `;
      await AppDataSource.transaction(async (tm) => {
        await tm.query(firstQuery);
        await tm.query(secondQuery);
      });

      res.status(200).json({
        status: "success",
        data: true,
      });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
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
    try {
      const currentUserId = req.userId;
      const userId = Number(req.get("userId"));
      let cursor = req.get("cursor");
      const limit = Number(req.get("limit"));
      const limitPlusOne = limit + 1;
      if (cursor && cursor !== "") {
        cursor = formatToDbDate(convertTZ(cursor));
      }

      const queryString = `
      select p.*, u.username, u.firstname, u.lastname, u.profilePicture,
      (select userId from likes where userId = ${currentUserId} and postId = p.id) likeStatus
      from posts p
      inner join users u on u.id = p.userId
      ${
        cursor
          ? `where p.createdDate < "${cursor}" and p.userId = ${userId}`
          : `where p.userId = ${userId}`
      }
      order by p.createdDate DESC
      limit ${limitPlusOne}
      `;
      const posts = await AppDataSource.query(queryString);

      // const qb = await AppDataSource.getRepository(Post)
      //   .createQueryBuilder("p")
      //   .orderBy("p.createdDate", "DESC")
      //   .take(limitPlusOne);

      // if (cursor && cursor !== "") {
      //   qb.where("p.createdDate < :cursor", {
      //     cursor: formatToDbDate(convertTZ(cursor)),
      //   });
      // }
      // const posts = await qb.getMany();

      res.status(200).json({
        status: "success",
        data: {
          data: posts.slice(0, limit!),
          nextCursor:
            posts.length === limitPlusOne
              ? posts[posts.length - 1 - 1].createdDate
              : null,
        },
      });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }

    // const userId = req.params.userId;
    // try {
    //   const postRepo: Repository<Post> = await AppDataSource.getRepository(
    //     Post
    //   );
    //   const posts: Post[] = await postRepo.find({
    //     relations: {
    //       user: true,
    //       likes: true,
    //     },
    //     where: {
    //       userId: parseInt(userId),
    //     },
    //   });
    //   if (posts.length === 0) {
    //     return res
    //       .status(200)
    //       .json({ status: "success", data: "The user has no posts" });
    //   }
    //   res.status(201).json({ status: "success", data: posts });
    // } catch (error) {
    //   let msg;
    //   if (error instanceof Error) {
    //     msg = error.message;
    //   }
    //   res.status(500).json({ status: "fail", msg });
    // }
  }

  async updatePost(req: Request, res: Response) {
    const postRequest: PostRequest = req.body;
    const { description, image } = postRequest;
    const currentUserId = req.userId!;
    const postId = req.params.postId;
    try {
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(currentUserId) },
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Not authoriztion" });
      }
      const postRepo: Repository<Post> = await AppDataSource.getRepository(
        Post
      );
      const post = await postRepo.findOne({
        relations: {
          user: true,
          likes: true,
        },
        where: {
          id: parseInt(postId),
          userId: parseInt(currentUserId),
        },
      });
      if (!post) {
        return res
          .status(200)
          .json({ status: "fail", msg: "Acttion forbidden" });
      }
      post.description = description;
      post.image = image;
      await postRepo.save(post);
      res.status(200).json({ status: "success", data: post });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }

  async deletePost(req: Request, res: Response) {
    const currentUserId = req.userId!;
    const postId = req.params.postId;
    try {
      const userRepo: Repository<User> = await AppDataSource.getRepository(
        User
      );
      const user: User | null = await userRepo.findOne({
        where: { id: parseInt(currentUserId) },
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: "fail", msg: "Not authoriztion" });
      }
      const postRepo: Repository<Post> = await AppDataSource.getRepository(
        Post
      );
      const post = await postRepo.findOne({
        relations: {
          user: true,
          likes: true,
        },
        where: {
          id: parseInt(postId),
        },
      });
      if (!post) {
        return res.status(400).json({ status: "fail", msg: "Post not found" });
      }
      await postRepo.delete({ id: parseInt(postId) });
      res.status(200).json({ status: "success", data: post });
    } catch (error) {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      }
      res.status(500).json({ status: "fail", msg });
    }
  }
}

export default new PostController();
