import { IsNotEmpty, IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
export class testDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  name: string
}
