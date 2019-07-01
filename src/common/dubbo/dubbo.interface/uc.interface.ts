import java from 'js-to-java'

/** epay uc 接口 */
export interface provider {
  queryUser(id: string)
  queryAccountIdentity(id: string)
}

const methods: provider = {
  /**
   * 查询支付核心账户--coreAccountId
   */
  queryUser(id: string) {
    return [java.string(id)]
  },
  /**
   * 身份证号加密index--certificateNoIndex
   * @param id
   */
  queryAccountIdentity(id: string) {
    return [java.string(id)]
  },
}

// 导出的类名和接口名key保持统一，并且和其他类区分开
export interface ucInterface {
  ucService: provider
}
//导出实际类
export const ucDependencies = {
  ucService: {
    version: '1.0.0',
    timeout: '30000',
    interface: 'com.netease.epay.uc.api.facade.AccountFacade',
    methodSignature: methods,
  },
}
