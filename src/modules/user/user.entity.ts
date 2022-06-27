import { type } from "os";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "../book/book.entity";

@Entity('users')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    name: string

    @Column({
        type: 'boolean',
        default: false
    })
    isSubscribed: boolean


    @OneToMany(()=>BookEntity, (book: BookEntity) => book.user)
    books: BookEntity[]

}