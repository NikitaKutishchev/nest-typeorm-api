import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/UserRepository';
import { BookController } from './book.controller';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookRepository } from './BookRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      UserEntity
    ])
  ],
  controllers: [BookController],
  providers: [BookService, UserRepository]
})
export class BookModule {}
