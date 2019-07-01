import { Logger } from '@/interceptors/logger/logger.base'
import { UserService } from '@/modules/user/user.service'
import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common'
// import { Observable } from 'rxjs'

// 用户未登录的话，守卫下
@Injectable()
export class UserGuard implements CanActivate {
  private readonly log: Logger
  constructor(private readonly userService: UserService) {
    this.log = new Logger()
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    const ck = request.cookies
    if (!ck) {
      throw new HttpException('用户未登录', HttpStatus.UNAUTHORIZED)
    }
    const res = await this.userService.isUser(ck)
    if (res) {
      if (res.retCode !== 200) {
        throw new UnauthorizedException(
          res.retCode,
          res.retMsg || '获取后去用户信息失败',
        )
      }
    } else {
      throw new UnauthorizedException(500, '通过oc文件解析用户信息失败')
    }
  }
}
