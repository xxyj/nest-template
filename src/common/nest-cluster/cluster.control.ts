import { Get, Controller } from '@nestjs/common';
import { AppService } from './cluster.server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): any {
    return this.appService.root();
  }

}