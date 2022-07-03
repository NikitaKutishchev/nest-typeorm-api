import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    // Метод для получения списка всех книг
    @Get('')
    async getAllBooks(): Promise<BookEntity[]> {
        return await this.bookService.getAllBooks()
    } 

    // Метод для получения конкретной книги
    @Get('/:id')
    async getBookById(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
        return await this.bookService.getBookById(id)
    } 

    // Метод для создания книги
    @Post('/create')
    @UsePipes(ValidationPipe)
    async createBook(@Body() book: CreateBookDTO): Promise<void>{
        await this.bookService.createBook(book)
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.bookService.deleteBook(id)
    }

    //7. Метод для добавления книги пользователю
    @Put('/:bookId/addBookToUser/:userId')
    async addBookToTheUser(
        @Param('userId', ParseIntPipe) userId: number, 
        @Param('bookId', ParseIntPipe) bookId: number
    ){
        return await this.bookService.addBookToTheUser(userId, bookId)
    }

    //8. Метод для возвращения книги
    @Put('/:id/return')
    async returnBook(@Param('id', ParseIntPipe) id: number){
        return this.bookService.returnBook(id)
    }
}
