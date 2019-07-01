import { TypeOrmModule } from '@nestjs/typeorm'
import path from 'path'
export const createMysqlProviders = () => {
  return {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await TypeOrmModule.forRoot({
        type: 'mysql',
        host: '10.165.124.79',
        port: 3506,
        username: 'dev1',
        password: 'Dev123456!',
        database: 'test',
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [
          path.resolve(__dirname, '../../modules/**/*.entity{.ts,.js}'),
        ],
        synchronize: true,
      }),
  }
}
