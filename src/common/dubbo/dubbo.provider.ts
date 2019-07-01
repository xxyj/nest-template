/**
 * dubboProvider providers.
 * @file dubbo 模块构造器
 */
import nzd from 'node-zookeeper-dubbo'
import java from 'js-to-java'
import { DUBBO_CLIENT } from './dubbo.constants'
import { config } from '@/config'
import { HttpException, HttpStatus } from '@nestjs/common'
import { dependencies, callBack } from './dubbo.interface/'
import { Logger } from '@/interceptors/logger/logger.base'

export const createDubboClientProvider = () => ({
  provide: DUBBO_CLIENT,
  useFactory: async () => {
    const log = new Logger()
    if (process.env.NODE_ENV === 'local') {
      return callBack
    } else {
      const options = {
        application: { name: 'node-game' }, // 项目名称
        registry: config.zk, // zookeeper服务器地址，多个服务器之间使用逗号分割
        root: config.zkRoot,
        dubboVer: '2.4.9',
        java,
        dependencies,
      }
      const Dubbo = await new nzd(options)
      Dubbo.on('service:changed', event => {
        log.info(`zk服务切换:${JSON.parse(event)}`)
        if (!Dubbo.zkIsConnect) {
          log.error(`zk（${config.zk}）链接失败`)
        }
      })
      return Dubbo
    }
  },
})
