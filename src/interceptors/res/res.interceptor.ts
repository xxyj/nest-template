/** 返回结果统一处理 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { resInterface } from './res.interface'

@Injectable()
export class ResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(res => {
        let r: resInterface = {
          code: 200,
          message: '',
          result: null,
        }
        if (!res) {
          r = {
            code: 500,
            result: null,
            message: '服务端错误',
          }
        } else if (typeof res === 'string') {
          r = {
            code: 200,
            result: res,
            message: '',
          }
        } else if (typeof res === 'object') {
          r.result = res.result || res.data || res
          r.code = res.code || res.retCode || res.statusCode || 200
          r.message = res.message || res.error || ''
        }
        return r
      }),
    )
  }
}
