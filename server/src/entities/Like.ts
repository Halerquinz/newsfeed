import { 
    Entity, 
    BaseEntity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity('likes')
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post

    @ManyToOne(() => User, (user) => user.comments)
    user: User

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}