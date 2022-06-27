import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './create-book.dto';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    // Метод для получения списка всех книг
    @Get('')
    async getAllUsers(): Promise<BookEntity[]> {
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
    async createBook(@Body() book: CreateBookDTO): Promise<BookEntity>{
        return await this.bookService.createBook(book)
    }
}
