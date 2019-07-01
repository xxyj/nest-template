// nest 多线程处理
import { NestFactory } from '@nestjs/core'
import { AppModule } from './cluster.module'
import cluster from 'cluster'
import os from 'os'
import EventEmitter from 'events'

const clusterEmitter = new EventEmitter()

const minWorkers = os.cpus().length
const workers = {}

const spawnWorker = () => {
  const worker = cluster.fork()
  workers[worker.id] = worker
}

clusterEmitter.on('spawnWorker', () => {
  spawnWorker()
})

const spawnWorkers = () => {
  while (Object.keys(workers).length < minWorkers) {
    clusterEmitter.emit('spawnWorker')
  }
}

if (cluster.isWorker) {
  async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule)
    // await app.listen()
  }
  bootstrap()
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT || 3000)
    cluster.settings
    // app.clusterEmitter = clusterEmitter
  }

  bootstrap()
  spawnWorkers()
}

// Listen for dying workers
cluster.on('exit', worker => {
  console.log('exit', worker.id)
  delete workers[worker.id]
  spawnWorkers()
})
