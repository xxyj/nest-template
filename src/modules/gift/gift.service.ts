import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { REDIS_CLIENT, Redis } from '@/common/redis'
import { DUBBO_CLIENT, provideInterface } from '@/common/dubbo'
import { Logger } from '@/interceptors/logger/logger.base'
import { UserService } from '../user/user.service'
import uuid from 'node-uuid'

@Injectable()
export class GiftService {
  constructor(
    @Inject(forwardRef(() => REDIS_CLIENT))
    private readonly redis: Redis,
    @Inject(forwardRef(() => DUBBO_CLIENT))
    private readonly dubboProvide: provideInterface,
    private readonly log: Logger,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  /** 领取礼包
   *  接口调用说明：
   *  1、获取用户id
   *  2、调用2个uc接口分别获取支付核心账户和身份证号加密index
   *  3、调用积分接口执行礼包派发
   */
  async receiveGift(id: string, ck: string, ip: string) {
    const res = await Promise.all(
      [
        // 获取用户账号
        this.userService.getUser(ck),
        // 获取身份证号加密index
        this.dubboProvide.ucService.queryAccountIdentity(id),
        // 获取支付核心账号
        this.dubboProvide.ucService.queryUser(id),
      ].map(promiseItem => {
        // 错误抓出来
        return promiseItem.catch(err => {
          throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        })
      }),
    )
    const accountId = res[0].ssn
    const certificateNoIndex = res[1]
      .getAccountIdentityDTO()
      .getIdentifyNoIndex()
    const coreAccountId = res[2].getCoreAccountDTO().getCoreAccountId()
    return await this.dubboProvide.activityService.distributeRaffleTicket({
      accountId,
      certificateNoIndex,
      coreAccountId,
      bizNo: uuid.v4().replace(/-/g, ''),
      userIp: ip,
      activityId: id,
    })
  }
  /** 查询礼包模块 */
  async queryModuleGifts(type: string) {}
}
