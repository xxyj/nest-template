import { Logger } from '@/interceptors/logger/logger.base'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly log: Logger = new Logger()
  // HttpException
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let res: any
    // 对于正常http请求错误的处理
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      res = exception.getResponse()
    } else {
      res = {
        message: exception.toString(),
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    }
    // const errMessage = typeof res === 'string' ? res : JSON.stringify(res)
    // 写日志
    this.log.error(`${res.message}: ${res.stack}`)

    response.status(status).json(res)
  }
}
