/**
 * 多线程，提供性能的同时，可以处理其他一些事情，比如服务器下线等
 */
import cluster from 'cluster'
import os from 'os'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@/interceptors/logger/logger.base'
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common'
import fs from 'fs'
import { exec } from 'child_process'
import { ErrorsInterceptor } from '@/interceptors/logger/logger.interceptor'
export const isMaster = cluster.isMaster

export const runCluster = async (
  AppModule: any,
  port?: number,
  globalFn?: Function,
  https?: Boolean,
  keyPath?: string,
  certPath?: string,
) => {
  const log = new Logger()
  if (isMaster) {
    const cpus = os.cpus().length
    for (let i = 0; i < cpus; i++) {
      const worker = cluster.fork()
      // exec('taskset -pc ' + i + ' ' + worker.process.pid, function(
      //   err,
      //   stdout,
      //   stderr,
      // ) {
      //   if (err) {
      //     log.error(err.toString())
      //   }
      //   log.info('stdout : ' + stdout)
      //   log.info('stderr: ' + stderr)
      // })
    }
    // 意外退出的时候，拉起来
    cluster.on('exit', (worker, code) => {
      if (code !== 0 && !worker.exitedAfterDisconnect) {
        log.error(`工作进程 ${worker.id} 崩溃了，正在开始一个新的工作进程`)
        cluster.fork()
      }
    })
    cluster.on('online', function(worker) {
      // 有worker进程建立，即开始监听message事件
      worker.on('message', function(data: any) {
        // 处理来自worker的请
        // 0表示健康检查 1表示日志处理
        switch (data.type) {
        case 0:
          break
        case 1:
          log[data.level](data.message)
          break
        }
      })
    })
  } else {
    // 创建服务
    let app: INestApplication
    if (https) {
      if (!keyPath || !certPath) {
        throw new HttpException('缺少https参数', HttpStatus.BAD_GATEWAY)
      }
      const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
      app = await NestFactory.create(AppModule, { httpsOptions })
    } else {
      app = await NestFactory.create(AppModule)
    }
    globalFn && globalFn(app)
    const ports = port || 3333
    await app.listen(ports)
    console.log(`open:http://localhost:${ports}`)
    // return app
  }
}
