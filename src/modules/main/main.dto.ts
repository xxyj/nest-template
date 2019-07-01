import { IsIn, IsNotEmpty, IsString, IsInt } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
const typeEnum = ['IOS', 'ANDROID', 'ALL']
//Banner - INDEX_BANNER；模块 - INDEX_GAMES；发现 - DISCOVERY；排行 - RANKING_LIST
const moduleGroup = ['INDEX_BANNER', 'INDEX_GAMES', 'DISCOVERY', 'RANKING_LIST']
/** 精选 - CHOICES
 * 推荐 - RECOMMENDED;
 * 新游 - NEW;
 * 排行榜 - RANKING_LIST;
 * 首屏banner - INDEX_PAGE_BANNER;
 * 活动 - ACTIVITY
 * 游戏礼包 - GAME_GIFTS
 * 资讯 - INFORMATION
 * APP首页 - APP_INDEX
 **/
const moduleType = [
  'CHOICES',
  'RECOMMENDED',
  'NEW',
  'RANKING_LIST',
  'INDEX_PAGE_BANNER',
  'ACTIVITY',
  'GAME_GIFTS',
  'INFORMATION',
  'APP_INDEX',
]
/** 普通查询参数，较多接口都只需要这一个参数 */
export class ReqTypeDto {
  @ApiModelProperty({ enum: typeEnum })
  @IsIn(typeEnum)
  appTerminalType: string
}

export class GameDetailDto extends ReqTypeDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  gameId: string
}

export class ModuleDetailDto extends ReqTypeDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  moduleId: string

  @ApiModelProperty({ enum: moduleGroup })
  @IsIn(moduleGroup)
  moduleGroup: string
}

export class ActivityInstantDTO {
  @ApiModelProperty()
  // @IsNumber()
  start: number

  @ApiModelProperty()
  // @IsNumber()
  end: number
}

export class InfoDetailDTO {
  @ApiModelProperty()
  @IsInt()
  /** 资讯id */
  infoId: string
}






