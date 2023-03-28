import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne} from 'typeorm'
import { User } from './User'
@Entity('follows')
export class Follow extends BaseEntity {
    @Column()
    userFollowing: number

    @Column()
    userFollowed: number
}