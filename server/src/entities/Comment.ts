import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("comments")
export class Comment extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  postId: number;

  @PrimaryColumn()
  userId: number;

  @Column()
  text: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
