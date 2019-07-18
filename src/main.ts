import { ValidationPipe } from './pipes/main.pipe'
import { ResInterceptor } from './interceptors/res/res.interceptor'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import csurf from 'csurf'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import history from 'connect-history-api-fallback'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { LoggingInterceptor } from './interceptors/logger/logger.interceptor'
import { runCluster } from './common/nest-cluster/cluter'
import { HttpExceptionFilter } from './filters/error.filters'
const port = process.env.ENV_PORT || process.env.PORT || 3333
async function bootstrap(app) {
  // 允许跨域
  app.enableCors()
  // 防止csrf攻击
  app.use(cookieParser())

  app.use(csurf({ cookie: true }))
  // gzip压缩
  app.use(compression())
  // 增加安全的http头部
  app.use(helmet())
  // 限制请求次数
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )
  //生成swagger文档
  const options = new DocumentBuilder()
    .setTitle('游戏分发')
    .setDescription('游戏分发node中间层接口')
    .setVersion('1.0')
    .addTag('api')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swaggerApi', app, document)
  //  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new ResInterceptor())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalInterceptors(new ErrorsInterceptor())
  // app.useGlobalPipes(new TestPipe())
  // history 路由
  app.use(history())
}
runCluster(AppModule, port, bootstrap)
