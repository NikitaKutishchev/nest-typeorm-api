import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './UserRepository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: UserRepository
    ){}

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations: {
                books: true
            }
        })
    } 

    async getUserById(id: number): Promise<any> {
        const user = await this.userRepository.find({
            where: {
                id
            },
            relations: {
                books: true
            }
        })

        if(user){
            return user
        } 
        throw new HttpException('Пользователь с таким id не найден ', HttpStatus.NOT_FOUND);
    } 

    async createUser(user: CreateUserDTO ): Promise<UserEntity>{

        return await this.userRepository.save(user) 
    }

    async updateUser(id: number, createUserDTO: CreateUserDTO){
        await this.userRepository.update(id, createUserDTO)
        return {msg: `Пользователь с id=${id} был отредактирован.`}
    }

    async deleteUser(id: number){
        await this.userRepository.delete(id)
        return {msg: `Пользователь с id=${id} был удален.`}
    }

    //3.Метод для покупки абонимента
    async subscribeUser(id: number){
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({isSubscribed: true})
            .where(`id = ${id}`)
            .execute()
    }

    
}
