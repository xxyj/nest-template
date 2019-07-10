/**
 * App config.
 * @file 应用运行配置
 * @module app/config
 */

import devConfig from './dev'
import localConfig from './local'
import testConfig from './test'
import productionConfigYq from './production-yq'
import productionConfigBj from './production-bj'
import { configInterface } from './interface'
import { join } from 'path'
const env = process.env.NODE_ENV

let config: configInterface = {
  redis: {},
  zk: '',
  env,
  zkRoot: '',
  db: {
    type: 'mysql',
    host: '10.165.124.79',
    port: 3506,
    username: 'dev1',
    password: 'Dev123456!',
    database: 'test',
    entities: [join(__dirname, '../modules/**/**.entity{.ts,.js}')],
    synchronize: true,
  },
}
switch (env) {
case 'local':
  config = Object.assign({}, config, localConfig)
  break
case 'env':
  config = Object.assign({}, config, devConfig)
  break
case 'test':
  config = Object.assign({}, config, testConfig)
  break
case 'production-yq':
  config = Object.assign({}, config, productionConfigYq)
  break
case 'production-bj':
  config = Object.assign({}, config, productionConfigBj)
  break
default:
  config = Object.assign({}, config, localConfig)
}
export { config }
