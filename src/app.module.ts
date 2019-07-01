import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

/** 公共模块 */
import { join } from 'path';
import { Connection } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DubboModule } from './common/dubbo/dubbo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'
import { RedisModule } from './common/redis/redis.module'

/** 业务模块 */
import { UserModule } from './modules/user/user.module'
import { MainModule } from './modules/main/main.module'
import { TestModule } from './modules/test/test.module'

@Module({
  imports: [
  UserModule,
  MainModule,
  TestModule,
  RedisModule.forRoot(),
  DubboModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '10.165.124.79',
    port: 3506,
    username: 'dev1',
    password: 'Dev123456!',
    database: 'test',
// entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: ['./modules/**/*.entity{.ts,.js}'],
    entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    synchronize: true,
    }),
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
