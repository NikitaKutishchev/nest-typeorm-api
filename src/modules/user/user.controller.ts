import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    //4. Метод для получения списка всех пользователей
    @Get('')
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers()
    } 

    //5. Метод для получения конкретного пользователя
    @Get('/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return await this.userService.getUserById(id)
    }

    //1. Метод для добавления пользователя
    @Post('/create')
    @UsePipes(ValidationPipe)
    async createUser(@Body() user: CreateUserDTO): Promise<UserEntity>{
        return await this.userService.createUser(user)
    }

    //2. Метод для редактирования пользователя
    @Put('/:id')
    async updateUser(
        @Body() createUserDTO: CreateUserDTO,
        @Param('id', ParseIntPipe) id: number
    ){
        await this.userService.updateUser(id, createUserDTO)
    }

    //3. Метод для удаления пользователя
    @Delete('/:id')
    @UsePipes(ValidationPipe)
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

    //3.Запрос для покупки абонимента
    @Put('/:id/subscribe')
    async subscribeUser(@Param('id', ParseIntPipe) id: number){
        await this.userService.subscribeUser(id)

        return {msg: `Пользователь с id=${id} купил абонимент.`}
    }

}
