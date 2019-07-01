import { UserGuard } from './guards/user.guard'
import Vue from 'vue'
import * as fs from 'fs'
import { createRenderer } from 'vue-server-renderer'
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
@UseGuards(UserGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query() req): Promise<any> {
    // return await renderer.renderToString(app)
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.appService.getHello('haha')
  }
}
