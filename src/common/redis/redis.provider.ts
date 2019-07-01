import { HttpException, HttpStatus } from '@nestjs/common'
import { config } from '@/config'
import { REDIS_CLIENT } from './redis.constants'
import Redis from 'ioredis'

export const createRedisClientProvider = () => ({
  provide: REDIS_CLIENT,
  useFactory: async () => {
    try {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'local') {
        return {
          async get(key) {
            return null
          },
          async set(key, value) {},
        }
      } else {
        const client = new Redis(config.redis)
        return client
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },
})
