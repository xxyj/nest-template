import java from 'js-to-java'

export interface provider {
  queryModuleListByGroup(moduleGroup: string): any
  queryModuleByIdAndGroup(moduleGroup: string, moduleId: string): any
  queryAllGameInfoList(): any
  queryAllInfoList(): any
  queryModuleIdListByModuleType(moduleType: string): any
  queryModuleListByType(moduleType: string): any
  queryGameIdByGiftSchemaId(giftSchemaId: string): any
}

const methods: provider = {
  /**
   * 根据模块获取游戏信息
   * @param moduleGroup
   */
  queryModuleListByGroup(moduleGroup: string) {
    return [java.String(moduleGroup)]
  },
  /**
   * 根据模块组合和id获取信息
   * @param moduleGroup
   * @param moduleId
   */
  queryModuleByIdAndGroup(moduleGroup: string, moduleId: string) {
    return [java.String(moduleGroup), java.String(moduleId)]
  },
  /**
   * 获取所有游戏信息
   */

  queryAllGameInfoList() {},
  /**
   * 根据类型获取模块
   * @param moduleType
   */
  queryModuleIdListByModuleType(moduleType: string) {
    return [java.String(moduleType)]
  },
  /**
   * 根据类型获取模块
   * @param moduleType
   */
  queryModuleListByType(moduleType: string) {
    return [java.String(moduleType)]
  },
  /**
   * 查询所有咨询信息
   */
  queryAllInfoList() {},
  /**
   * 使用游戏礼包id查询游戏对应的游戏id
   * @param giftSchemaId
   */
  queryGameIdByGiftSchemaId(giftSchemaId: string) {
    return [java.String(giftSchemaId)]
  },
}

// 导出的类名和接口名key保持统一，并且和其他类区分开
export interface mainInterface {
  service: provider
}
//导出实际类
export const mainDependencies = {
  service: {
    version: '1.0.0',
    timeout: '30000',
    interface: 'com.netease.epay.config.client.rpc.GameRpcQueryService',
    methodSignature: methods,
  },
}
