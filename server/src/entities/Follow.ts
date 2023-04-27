import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { User } from "./User";
@Entity("follows")
@Index(["userFollowingId", "userFollowedId"], { unique: true })
export class Follow extends BaseEntity {
<<<<<<< HEAD
  @PrimaryColumn()
  userFollowingId: number;

  @PrimaryColumn()
  userFollowedId: number;

  @ManyToOne(() => User, (user) => user.followings)
  userFollowing: User;

  @ManyToOne(() => User, (user) => user.followers)
  userFollowed: User;
=======
  @ManyToOne(() => User, (user) => user.followings)
  userFollowing: User;

  @ManyToOne(() => User, (user) => user.followers)
  userFollowed: User;

  @PrimaryColumn()
  userFollowingId: number;

  @PrimaryColumn()
  userFollowedId: number;
>>>>>>> 30df116d1829ddcbc650491b58c7aef15017e759
}
