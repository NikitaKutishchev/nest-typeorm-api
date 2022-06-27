import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "./book.entity";
import { CreateBookDTO } from "./create-book.dto";



@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity) 
        private bookRepository: Repository<BookEntity>
    ){}

    async getAllBooks(): Promise<BookEntity[]> {
        return await this.bookRepository.find()
    } 

    async getBookById(id: number): Promise<BookEntity> {
        return await this.bookRepository.findOneBy({id})
    } 

    async createBook(book: CreateBookDTO ){
        return await this.bookRepository.save(book) 
    }
}