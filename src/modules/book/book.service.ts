import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { UserRepository } from "../user/UserRepository";
import { BookEntity } from "./book.entity";
import { BookRepository } from "./BookRepository";
import { CreateBookDTO } from "./dto/create-book.dto";



@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity) 
        private readonly bookRepository: BookRepository,
        @InjectRepository(UserEntity) 
        private readonly userRepository: UserRepository,
    ){}

    /**
     * Метод для получения всех книг из библиотеки с информацией о том, находится ли конкретная 
     * книга в свободном доступе или же ее взял какой-то пользователь. 
     * 
     * Для заупуска метода необходимо отправить GET запрос по роуту /books 
     */
    async getAllBooks(): Promise<BookEntity[]> {
        return await this.bookRepository.find({
            relations: {
                user: true
            }
        })
    } 


    /**
     * 
     * @param id - айди книги, информацию о которой нужно получить.
     * @returns Метод возвращает информацию о книги по ее айди. Для вызова метода getBookById необходимо
     * отправить GET запрос по роуту /books/:id
     */
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

    /**
     * 
     * @param book - Книга, передаваемая в запросе, где
     * @param book.id - id книги, который генерируется автоматически,
     * @param book.title - название книги (обязательное поле),
     * @param book.isTaken - поле типа boolean с дефолтным значением false
     * 
     * Метод создает новую книгу в бд по POST запросу /books/create
     */
    async createBook(book: CreateBookDTO ){
        await this.bookRepository.save(book) 
    }
    

    /**
     * 
     * @param id - айди книги
     * @returns - информацию о конечном результате 
     * 
     * Метод удаляет книгу из списка по DELETE запросу по роуту /books/:id
     */
    async deleteBook(id: number){
        const book = await this.bookRepository.findOneBy({id})

        if(book){
            this.bookRepository.delete(id)
            return {msg: `Книга с id=${id} была удалена из списка`}
        } 
        throw new HttpException('Книга с таким id не найдена ', HttpStatus.NOT_FOUND);
    }


    /**
     * 
     * @param userId - айди пользователя, которомы добавляется книга
     * @param bookId - айди книги, которая добавляется пользователю
     * @returns Возвращает результат выполнения метода
     * 
     * Метод добавления книги пользователю с отношением OneToMany-ManyToOne
     */
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

    /**
     * 
     * @param id - айди книги
     * @returns информацию о выполнении метода
     * 
     * Метод для возвращения книги обратно в библиотеку.
     */
    async returnBook(id: number){

        const book = await this.bookRepository.findOneBy({id})

        if(!book){
            throw new HttpException(`Книга с id=${id} не найдена `, HttpStatus.NOT_FOUND)
        }
        if(!book.isTaken) return {msg: `Книга с id=${id} не занята. `}

        book.user = null
        book.isTaken = false

        await this.bookRepository.save(book)

        return {
            msg: `Книга ${book.id} была возвращена обратно`}

    }
    
}