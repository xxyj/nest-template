import java from 'js-to-java'

export interface provider {
  queryAppCmsNew(masterType: number, slaveType: number)
  queryPcCms(masterType: number, slaveType: number)
}

const methods: provider = {
  /**
   * APP广告位查询接口
   * @param masterType
   * @param slaveType
   */
  queryAppCmsNew(masterType: number, slaveType: number) {
    return [java.int(masterType), java.int(slaveType)]
  },
  /**
   * APP广告位查询接口
   * @param moduleGroup
   * @param moduleId
   */
  queryPcCms(masterType: number, slaveType: number) {
    return [java.int(masterType), java.int(slaveType)]
  },
  /**
   * 获取所有游戏信息
   */
}

// 导出的类名和接口名key保持统一，并且和其他类区分开
export interface adInterface {
  adService: provider
}
//导出实际类
export const adDependencies = {
  adService: {
    version: '1.0.0',
    timeout: '30000',
    interface: 'com.netease.epay.config.client.rpc.AdPositionRpcService',
    methodSignature: methods,
  },
}
