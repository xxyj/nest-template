import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Logger } from './logger.base'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly log: Logger = new Logger()
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let req = context.getArgs()[0]
    let str = ''
    switch (req.method.toLocaleLowerCase()) {
    case 'get':
    case 'delete':
    case 'put':
      str = `url=${req.url};`
      break
    case 'post':
      str = `url=${req.url};params=${JSON.stringify(req.body)}`
      break
    default:
      str = `url=${req.url};`
      break
    }
    const now = Date.now()
    // 不用时间，因为看着太像了，不方便
    const random = Math.random()
      .toString(36)
      .substring(2)
    this.log.info(`request[${random}]:${str}`)
    return next.handle().pipe(
      tap(res => {
        if (!res) {
          return
        }
        let strRes = res.message || JSON.stringify(res)
        this.log.info(
          `response[${random}]:use ${Date.now() - now}ms,res:${strRes}`,
        )
        // 打印错误信息
        if (res.code && res.code !== 200) {
          this.log.error(res.message || JSON.stringify(res))
        }
      }),
    )
  }
}

// 这个让过滤器处理更加的方便
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private readonly log: Logger = new Logger()
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err =>
        throwError(
          (err => {
            this.log.error(err.message)
            return new BadGatewayException(err)
          })(err),
        ),
      ),
    )
  }
}
