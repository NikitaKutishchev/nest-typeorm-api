import { IsNotEmpty, IsNumber, Length } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('books')
export class BookEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    @Length(3)
    title: string

    @Column({
        default: false,
        type: 'boolean'
    })
    isTaken: boolean

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.books, {onDelete: 'SET NULL'})
    user: UserEntity

}