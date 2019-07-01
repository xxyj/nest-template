import { Module, DynamicModule, Global } from '@nestjs/common'
import { createRedisClientProvider } from './redis.provider'

@Global()
@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    const RedisClientProvider = createRedisClientProvider()
    return {
      module: RedisModule,
      providers: [RedisClientProvider],
      exports: [RedisClientProvider],
    }
  }
}
