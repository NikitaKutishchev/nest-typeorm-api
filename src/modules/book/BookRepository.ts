import { Repository } from "typeorm";
import { BookEntity } from "./book.entity";


export class BookRepository extends Repository<BookEntity>{
    
}