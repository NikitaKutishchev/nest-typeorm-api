import { Length } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity({name: 'books'})
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

    @ManyToOne(
        () => UserEntity, 
        user => user.books, 
        {
            onDelete: 'CASCADE',
            nullable: true
        }
    )
    user: UserEntity

}