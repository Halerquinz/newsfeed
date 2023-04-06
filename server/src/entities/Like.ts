import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("likes")
export class Like extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: "CASCADE",
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
