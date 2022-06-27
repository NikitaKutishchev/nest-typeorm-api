import { IsNotEmpty, IsNumber, Length } from "class-validator"


export class CreateBookDTO{

    id: number

    @Length(3)
    title: string

    @IsNotEmpty()
    isTaken: boolean

    userId: number

}