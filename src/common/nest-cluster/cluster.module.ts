import { Module } from '@nestjs/common';
import { AppController } from './cluster.control';
import { AppService } from './cluster.server';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ AppService ]
})
export class AppModule {}
