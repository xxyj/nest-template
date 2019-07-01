import { TestService } from './test.service'
import { Controller, Get, Query } from '@nestjs/common'
import { testDto } from './test.dto'

@Controller('test')
export class TestController {
  constructor(private readonly server: TestService) {}
  @Get('setData')
  async getData(@Query() req: testDto) {
    return !!this.server.insert(req.name)
  }
  @Get('getAll')
  async getAll(@Query() req) {
    return this.server.findAll()
  }
}
