import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
/** 普通查询参数，较多接口都只需要这一个参数 */
export class giftIdDto {
  @ApiModelProperty()
  @IsString()
  giftSchemaId: string
}
