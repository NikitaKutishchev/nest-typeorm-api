import { IsNotEmpty, IsNumber, Length } from "class-validator";
import { BookEntity } from "../book/book.entity";

export class CreateUserDTO{
    
    id: number

    @IsNotEmpty({message: "name shouldn't be empty"})
    @Length(2)
    name: string

    @IsNotEmpty()
    isSubscribed: boolean

    books: BookEntity[]
    
}