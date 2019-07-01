import {
  ActivityParams,
  promotionUserQueryDto,
} from '@/modules/main/main.interface'
import java from 'js-to-java'

/** 积分活动 */
export interface provider {
  queryActivityList(params: ActivityParams)
  getUserParticipatedPromotionListByPage(params: promotionUserQueryDto)
  distributeRaffleTicket(params: any)
}

const methods: provider = {
  /**
   * 查询活动列表
   */
  queryActivityList(params: ActivityParams) {
    return [java.object(params)]
  },
  /**
   * 查询用户活动列表
   */
  getUserParticipatedPromotionListByPage(params: promotionUserQueryDto) {
    return [java.object(params)]
  },
  /**
   * 获取礼包
   */
  distributeRaffleTicket(params: any) {
    return [java.object(params)]
  },
}

// 导出的类名和接口名key保持统一，并且和其他类区分开
export interface activityInterface {
  activityService: provider
  promotionUserService: provider
}
//导出实际类
export const activityDependencies = {
  activityService: {
    version: '1.0.0',
    timeout: '30000',
    interface: 'com.netease.epay.promotion.client.rpc.ActivityRpcService',
    methodSignature: methods,
  },
  promotionUserService: {
    version: '1.0.0',
    timeout: '30000',
    interface: 'com.netease.epay.promotion.client.rpc.PromotionUserRpcService ',
    methodSignature: methods,
  },
  rafflePromotionService: {
    version: '1.0.0',
    timeout: '30000',
    interface:
      'com.netease.epay.promotion.client.rpc.RafflePromotionRpcService ',
    methodSignature: methods,
  },
}
