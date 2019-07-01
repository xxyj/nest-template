import { MainService } from './main.service'
import { Controller, Get, Query } from '@nestjs/common'
import {
  ReqTypeDto,
  GameDetailDto,
  ModuleDetailDto,
  ActivityInstantDTO,
  InfoDetailDTO,
} from './main.dto'
import { HttpException, HttpStatus } from '@nestjs/common'

/** 游戏主要模块，详情，资讯，礼包等，以后多了再拆分 */
@Controller('app')
export class MainController {
  constructor(private readonly service: MainService) {}
  /** 获取游戏首页主要模块 */

  @Get('/queryMainMoudles.htm')
  async getMainModules(@Query() req: ReqTypeDto): Promise<any> {
    let res = await this.service.getMainModules(req.appTerminalType)
    return res
  }

  /** 获取首页banner */
  @Get('/queryMainBanner.htm')
  async getMainBanner(@Query() req: ReqTypeDto): Promise<any> {
    return await this.service.getMainBanners(req.appTerminalType)
  }

  /** 查询模块信息 */
  @Get('/queryModule.htm')
  async queryModule(@Query() req: ModuleDetailDto): Promise<any> {
    //app终端类型（IOS  ANDROID  ALL）
    const type = req.appTerminalType
    const moduleId = req.moduleId
    const moduleGroup = req.moduleGroup
    return await this.service.queryModule(moduleId, moduleGroup, type)
  }

  /** 查询游戏排名 */
  @Get('/queryRank.htm')
  async queryRank(@Query() req: ReqTypeDto): Promise<any> {
    return await this.service.queryRank(req.appTerminalType)
  }

  /** 查询游戏详情 */
  @Get('/queryGameDetail.htm')
  async queryGameDetail(@Query() req: GameDetailDto): Promise<any> {
    //app终端类型（IOS  ANDROID  ALL）
    const type = req.appTerminalType
    const id = req.gameId
    return await this.service.queryGameDetail(id, type)
  }

  /** 查询当前活动 */
  @Get('/queryInstantActivity.htm')
  async queryInstantActivity(@Query() req: ActivityInstantDTO): Promise<any> {
    const start = req.start
    const end = req.end
    if (start > end) {
      throw new HttpException('start不能大于end', HttpStatus.BAD_REQUEST)
    }
    return await this.service.queryInstantActivity(start, end)
  }

  /** 电竞tab */
  @Get('/queryGaming.htm')
  async queryGaming(): Promise<any> {
    return await this.service.queryGaming()
  }

  /** 小游戏tab */
  @Get('/queryMiniGame.htm')
  async queryMiniGame(): Promise<any> {
    return await this.service.queryGaming()
  }

  /** 查询新鲜资讯模块 */
  @Get('/queryNewest.htm')
  async queryNewest(@Query() req: ActivityInstantDTO): Promise<any> {
    const start = req.start
    const end = req.end
    if (start > end) {
      throw new HttpException('start不能大于end', HttpStatus.BAD_REQUEST)
    }
    return await this.service.queryNewest(start, end)
  }

  /** 查询资讯详情 */
  @Get('queryPageDetail.htm')
  async queryPageDetail(@Query() req: InfoDetailDTO): Promise<any> {
    return await this.service.queryPageDetail(req.infoId)
  }
}
