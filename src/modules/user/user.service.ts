import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { CreateUserDTO } from './create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepository: Repository<UserEntity>
    ){}

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    } 

    async getUserById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id})

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
    }

    async deleteUser(id: number){
        return this.userRepository.delete(id)
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
