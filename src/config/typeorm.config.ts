import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BookEntity } from "src/modules/book/book.entity";
import { UserEntity } from "src/modules/user/user.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: 'library', 
    entities: [UserEntity, BookEntity],
    synchronize: true,
    autoLoadEntities: true,
}