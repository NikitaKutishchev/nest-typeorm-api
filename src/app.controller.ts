import { Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {

    constructor(private appService: AppService){}

    

}
