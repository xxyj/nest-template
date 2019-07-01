import { giftIdDto } from './gift.dto'
import { GiftService } from './gift.service'
import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { ReqTypeDto } from '../main/main.dto'
import { UserGuard } from '@/guards/user.guard'
import { getIp } from '@/tools/util'

/** 礼包模块 */
@Controller('app')
export class GiftController {
  constructor(private readonly service: GiftService) {}

  /** 领取礼包 */
  @Get('/receiveGift.htm')
  @UseGuards(UserGuard)
  async receiveGift(@Query() req: giftIdDto, @Request() rest): Promise<any> {
    let res = await this.service.receiveGift(
      req.giftSchemaId,
      rest.cookies,
      getIp(rest),
    )
    return res
  }
  /**二期-发现页查询礼包模块 */
  @Get('/queryModuleGifts.htm')
  async queryModuleGifts(@Query() req: ReqTypeDto): Promise<any> {
    return await this.service.queryModuleGifts(req.appTerminalType)
  }
}
