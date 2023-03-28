import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Length, IsEmail } from "class-validator";

export enum Sex {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

import { Comment } from "./Comment";
import { Like } from "./Like";
import { Post } from "./Post";
import { Chat } from "./Chat";
import { Message } from "./Message";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(6)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  phone: string;

  @Column()
  @Length(6)
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  isAdmin: boolean;

  @Column()
  profilePicture: string;

  @Column()
  coverPicture: string;

  @Column()
  livesin: string;

  @Column()
  about: String;

  @Column({ type: "enum", enum: Sex })
  sex: Sex;

  @Column()
  dateOfBirth: String;

  @Column()
  isDeleted: boolean;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @ManyToMany(type => User, user => user.following)
  @JoinTable({
    name: "follows",
    joinColumn: {
      name: "following",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "follower",
      referencedColumnName: "id",
    },
  })
  followers: User[];

  @ManyToMany(type => User, user => user.followers)
  following: User[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Chat, chat => chat.user1)
  chatUser1: Chat[];

  @OneToMany(() => Chat, chat => chat.user2)
  chatUser2: Chat[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
