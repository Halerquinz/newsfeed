import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@Entity("chats")
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToOne(type => User, user => user.chatUser1)
  user1: User;

  @ManyToOne(type => User, user => user.chatUser2)
  user2: User;

  @Column()
  user1Id: number;

  @Column()
  user2Id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
