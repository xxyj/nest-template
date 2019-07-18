import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { uuid } from '@/tools/util'

@Injectable()
export class CommonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // 将requestId生成，后续可以追踪
    global.requestId = req.headers['x-RelationQueryBuilder'] || uuid()
    next()
  }
}
