import { 
  Entity, 
  Column, 
  BaseEntity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  postId: number

  @Column()
  userId: number

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post

  @ManyToOne(() => User, (user) => user.comments)
  user: User

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}