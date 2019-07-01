import { Module, DynamicModule } from '@nestjs/common'
import { createMysqlProviders } from './mysql.provider'

@Module({})
export class MysqlModule {
  static forRoot(): DynamicModule {
    const MysqlClientProvider = createMysqlProviders()
    return {
      module: MysqlModule,
      providers: [MysqlClientProvider],
      exports: [MysqlClientProvider],
    }
  }
}
