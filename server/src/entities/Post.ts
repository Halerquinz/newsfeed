import { 
    Entity, 
    Column,
    PrimaryGeneratedColumn, 
    BaseEntity, ManyToOne, 
    OneToMany, 
    CreateDateColumn, 
    UpdateDateColumn
} from 'typeorm'
import { Comment } from './Comment';
import { Like } from './Like';
import { User } from './User'


@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
   
    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @Column()
    userId: number
    
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => Like, like => like.post)
    likes: Like[];

    @Column()
    desc: string
    
    @Column()
    image: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}