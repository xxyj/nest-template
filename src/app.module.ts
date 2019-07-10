import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

/** 公共模块 */
import { Connection } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DubboModule } from './common/dubbo/dubbo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'
import { RedisModule } from './common/redis/redis.module'

/** 业务模块 */
import { UserModule } from './modules/user/user.module'
import { TestModule } from './modules/test/test.module'
import { config } from './config'

console.log(config.db)

@Module({
  imports: [
  UserModule,
  TestModule,
  RedisModule.forRoot(),
  DubboModule.forRoot(),
  TypeOrmModule.forRoot(config.db),
  ],
  controllers: [AppController],
  providers: [AppService],
  })
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
