import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './modules/user/UserRepository';
import { BookRepository } from './modules/book/BookRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,  
    BookModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
