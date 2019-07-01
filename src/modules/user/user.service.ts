import { Redis, REDIS_CLIENT } from '@/common/redis'
import { Injectable, HttpException, Inject, forwardRef } from '@nestjs/common'
import { config } from '@/config'
import request from 'request'
import { getBytes } from '@/tools/util'
import { userDTO } from '../main/main.interface'
const isLocal = !config.env || config.env === 'local'

@Injectable()
export class UserService {
  private so: userDTO
  constructor(
    @Inject(forwardRef(() => REDIS_CLIENT))
    private readonly redis: Redis,
  ) {
    // this.redis = new Redis()
    // if (!isLocal) {
    //   const ffi = require('ffi')
    //   this.so = ffi.Library(config.userSoPath, {
    //     // 出参，入参，通过so验证用户
    //     validate_cookie: ['void', ['array', 'int', 'int', 'bool']],
    //   })
    // }
  }
  async isUser(cookie: string): Promise<any> {
    return !!(await this.getUser(cookie))
  }
  // 验证cookie信息
  async getUser(cookie: string): Promise<any> {
    if (isLocal) {
      return true
    }
    let res = this.redis.get(cookie)
    if (!res) {
      const params = {
        productid: 'bf2c2feceb1a4c80b74b38c097da38ea',
        cookie,
        cookieName: 'NTES_SESS',
        recreate: 0,
      }
      // 杭州机房
      let result = await request.post(
        'https://cookiehz.reg.163.com/validate',
        params,
      )
      if (result.retCode === 500) {
        // 北京机房
        result = await request.post(
          'https://cookiebj.reg.163.com/validate',
          params,
        )
      }
      // 可以将结果缓存一个小时到redis中
      if (result.retCode === 200) {
        res = result.data
        this.redis.set(cookie, result.data, 'EX', 3600)
      } else {
        throw new HttpException('获取用户信息失败', result.retCode)
      }
    }
    console.log(res)
    return res
  }
  // 获取用户信息
}
