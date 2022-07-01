import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './modules/book/book.entity';
import { BookRepository } from './modules/book/BookRepository';
import { UserEntity } from './modules/user/user.entity';
import { UserRepository } from './modules/user/UserRepository';

@Injectable()
export class AppService {

    constructor(
        // @InjectRepository(UserEntity) private readonly userRepository: UserRepository,
        // @InjectRepository(BookEntity) private readonly bookRepository: BookRepository
    ) {}

    

}
