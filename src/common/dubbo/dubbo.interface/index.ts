import { adInterface, adDependencies } from './ad.interface'
import { mainInterface, mainDependencies } from './main.interface'
import request from 'request'
import { ucInterface, ucDependencies } from './uc.interface'
import { activityInterface, activityDependencies } from './activity.interface'

export interface provideInterface
  extends adInterface,
    mainInterface,
    ucInterface,
    activityInterface {}
export const dependencies = {
  ...mainDependencies,
  ...adDependencies,
  ...ucDependencies,
  ...activityDependencies,
}

/**
 *nei mock的时候需要使用
 */
const env = process.env.NODE_ENV
let callBack = {}
if (env === 'local') {
  const pre =
    'https://nei.netease.com/api/rpcmock/7646cfc6f4e94e04cb82640b2db3ad1c/'
  for (let key in dependencies) {
    callBack[key] = {}
    for (let item in dependencies[key]['methodSignature']) {
      callBack[key][item] = () => {
        return new Promise((resolve, reject) => {
          const url = `${pre}${dependencies[key].interface.replace(
            /\./g,
            '-',
          )}-${item}`.toLocaleLowerCase()
          request.post(url, (error, response, body) => {
            if (error || response.statusCode !== 200) {
              reject()
            }
            resolve(body)
          })
        })
      }
    }
  }
}
export { callBack }
