import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestService } from './test.service'
import { TestController } from './test.controller'
import { test } from './test.entity'

@Module({
  imports: [TypeOrmModule.forFeature([test])],
  providers: [TestService],
  controllers: [TestController],
  })
export class TestModule {}
