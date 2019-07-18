import { isMaster } from '@/common/nest-cluster/cluter'
import { Injectable } from '@nestjs/common'
import { createLogger, format, transports } from 'winston'
import { LoggerService } from './logger.interface'
const { combine, timestamp, printf } = format

@Injectable()
export class Logger implements LoggerService {
  private readonly logger

  constructor() {
    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp}[${level}] : ${message}`
    })
    this.logger = createLogger({
      level: 'info',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
      transports: [
        new transports.File({
          filename: 'error.log',
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        new transports.File({
          filename: 'combined.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
    })

    // 本地环境不需要写日志
    if (process.env.NODE_ENV === 'local') {
      this.logger.add(
        new transports.Console({
          format: format.simple(),
        }),
      )
    }
  }

  write(level: string, mss: string | object) {
    // 每个请求都得带上requestid
    let message = `[${global.requestId}]${mss.toString()}`
    if (isMaster) {
      this.logger[level](message)
    } else {
      process.send({ type: 1, level, message })
    }
  }
  debug(message: string | object) {
    this.write('debug', message)
  }

  error(message: string | object) {
    this.write('error', message)
  }

  info(message: string | object) {
    this.write('info', message)
  }

  warn(message: string | object) {
    this.write('warn', message)
  }
}
