import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { UserRepository } from "../user/UserRepository";
import { BookEntity } from "./book.entity";
import { BookRepository } from "./BookRepository";
import { CreateBookDTO } from "./create-book.dto";



@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity) 
        private readonly bookRepository: BookRepository,
        @InjectRepository(UserEntity) 
        private readonly userRepository: UserRepository,
    ){}


    async getAllBooks(): Promise<BookEntity[]> {
        return await this.bookRepository.find({
            relations: {
                user: true
            }
        })
    } 


    async getBookById(id: number): Promise<any> {
        const book = await this.bookRepository.find({
            where: {
                id
            },
            relations: {
                user: true
            }
        })

        if(book){
            return book
        } 
        throw new HttpException('Книга с таким id не найдена ', HttpStatus.NOT_FOUND);
    } 


    async createBook(book: CreateBookDTO ){
        return await this.bookRepository.save({...book, "userId": book["userId"]}) 
    }

    async deleteBook(id: number){
        const book = await this.bookRepository.findOneBy({id})

        if(book){
            return this.bookRepository.delete(id)
        } 
        throw new HttpException('Книга с таким id не найдена ', HttpStatus.NOT_FOUND);
    }


    async addBookToTheUser(userId: number, bookId: number) {

        const book = await this.bookRepository.findOneBy({id: bookId})
        const user = await this.userRepository.findOneBy({id: userId})

        if(!book){
            throw new HttpException(`Книга с id=${bookId} не найдена `, HttpStatus.NOT_FOUND)
        }
        if(!user){
            throw new HttpException(`Пользователь с id=${userId} не найден `, HttpStatus.NOT_FOUND)
        }

        if(!user.isSubscribed)  return {msg: `У пользователя с id=${user.id} нет абонимента.`}
        if(book.isTaken)        return {msg: `Книга с id=${book.id} взята другим пользователем.`}

        book.user = user
        book.isTaken = true

        this.bookRepository.save(book)

        return {msg: `Книга ${book.id} добавлена пользователю ${user.id}`}

    }


    async returnBook(id: number){

        const book = await this.bookRepository.findOneBy({id})

        if(!book){
            throw new HttpException(`Книга с id=${id} не найдена `, HttpStatus.NOT_FOUND)
        }
        if(book.user === null) return {msg: `Книга с id=${id} не занята. `}

        book.user = null
        book.isTaken = false

        await this.bookRepository.save(book)

        return {msg: `Книга ${book.id} была возвращена обратно`}

    }
    
}