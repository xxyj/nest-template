/**
 * dubbo module.
 * @file dubbo 全局模块
 * @module tools/dubbo/module
 */

import { Module, Global, DynamicModule } from '@nestjs/common'
import { createDubboClientProvider } from './dubbo.provider'

@Global()
@Module({})
export class DubboModule {
  static forRoot(): DynamicModule {
    const DubboClientProvider = createDubboClientProvider()
    return {
      module: DubboModule,
      providers: [DubboClientProvider],
      exports: [DubboClientProvider],
    }
  }
}
