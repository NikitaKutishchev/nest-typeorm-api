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

    /**
     * 
     * @returns Все пользователи
     * Метод GET роут /users
     */
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations: {
                books: true
            }
        })
    } 

    /**
     * 
     * @param id - айди конкретного польщователя
     * @returns - информация по конкретному пользователю
     * Метод GET роут /users/:id
     */
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

    /**
     * 
     * @param user -объект user, передаваемый в теле запроса, где 
     * @param user.id - автоматически генерируемый id пользователя,
     * @param user.name - имя пользователя,
     * @param user.isSubscribed - абонимент, поле типа boolen c дефолтным значением false
     * @param user.books - массив книг, взятых пользователем
     * 
     * Метод создает нового пользователя в БД.
     * Запрос POST роут users/create
     */
    async createUser(user: CreateUserDTO ): Promise<any>{

        await this.userRepository.save(user) 

        return {msg: `новый пользователь с id=${user.id} был создан`}
    }


    /**
     * Метод для редактирования пользователя
     * Метод PUT роут users/:id
     */
    async updateUser(id: number, createUserDTO: CreateUserDTO){
        await this.userRepository.update(id, createUserDTO)
        return {msg: `Пользователь с id=${id} был отредактирован.`}
    }

    /**
     * Метод для удаления пользователя
     * Метод DELETE роут users/:id
     */
    async deleteUser(id: number){
        await this.userRepository.delete(id)
        return {msg: `Пользователь с id=${id} был удален.`}
    }

    /**
     * Метод для покупки абонимента
     * Метод PUT роут users/:id/subscribe
     */
    async subscribeUser(id: number){
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({isSubscribed: true})
            .where(`id = ${id}`)
            .execute()
    }

    
}
