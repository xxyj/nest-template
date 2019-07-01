import { UserService } from './user.service'
import { Controller, Get, Query } from '@nestjs/common'

@Controller()
export class UserController {
  private readonly service: UserService
  @Get('/app/queryUser.htm')
  async getUser(@Query() req) {
    // console.log(req.cookies)
    return this.service.getUser(req.cookies.net_)
  }
}
