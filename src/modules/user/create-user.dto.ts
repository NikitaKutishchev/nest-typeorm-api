import { IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateUserDTO{
    
    id: number

    @IsNotEmpty({message: "name shouldn't be empty"})
    @Length(2)
    name: string

    @IsNotEmpty()
    isSubscribed: boolean

    
}