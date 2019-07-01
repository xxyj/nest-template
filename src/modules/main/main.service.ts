import { ModuleType, ModuleGroup, AdSubType } from '@/enums'
import {
  CallBackDTO,
  requestParamsDTO,
  RedisBackDTO,
  ModuleDTO,
  CmsDTO,
} from './main.interface'
import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { REDIS_CLIENT, Redis } from '@/common/redis'
import { DUBBO_CLIENT, provideInterface } from '@/common/dubbo'
import { Logger } from '@/interceptors/logger/logger.base'

@Injectable()
export class MainService {
  private readonly log: Logger
  constructor(
    @Inject(forwardRef(() => REDIS_CLIENT))
    private readonly redis: Redis,
    @Inject(forwardRef(() => DUBBO_CLIENT))
    private readonly dubboProvide: provideInterface,
  ) {
    this.log = new Logger()
  }

  _filterTypeData(data: any[], type: string) {
    if (type && type !== 'ALL') {
      // 过滤类型
      data = data.filter(item => {
        if (item.gameList) {
          return item.gameList.filter(i => {
            return i.appTerminalType === 'ALL' || i.appTerminalType === type
          }).length
        } else {
          return item.appTerminalType === 'ALL' || item.appTerminalType === type
        }
      })
    }
    return data
  }

  /**
   * 获取到所有的模块数据以及广告数据
   */
  async _getAllModuleData(): Promise<RedisBackDTO> {
    const mDto: ModuleDTO[] = []
    const requestArr = { modules: [], ad: [] },
      callBack: RedisBackDTO = { modules: mDto, ad: {} }
    let moduleRes = JSON.parse(await this.redis.get('MODULE'))
    let adRes = JSON.parse(await this.redis.get('AD'))
    if (!moduleRes) {
      requestArr.modules.push(Object.values(ModuleGroup))
      // r.length && .push(r)
    }
    // 后面得用
    // const len = requestArr.modules.length
    const len = 4
    let adArr = []
    if (!adRes) {
      adArr = Object.values(AdSubType).filter(
        value => isNaN(Number(value)) === false,
      )
      requestArr.ad = adArr.slice(0)
    }

    if (requestArr.modules.length + requestArr.ad.length) {
      // 查询出所有的数据,并且保存到分组中
      //this.dubboProvide.service.queryModuleListByGroup
      //this.dubboProvide.adService.queryAppCmsNew(80, +item),
      const result = await Promise.all(
        [
          this.dubboProvide.service.queryModuleListByGroup('INDEX_BANNER'),
          this.dubboProvide.service.queryModuleListByGroup('INDEX_GAMES'),
          this.dubboProvide.service.queryModuleListByGroup('DISCOVERY'),
          this.dubboProvide.service.queryModuleListByGroup('RANKING_LIST'),
          this.dubboProvide.adService.queryAppCmsNew(80, 61),
          this.dubboProvide.adService.queryAppCmsNew(80, 62),
          this.dubboProvide.adService.queryAppCmsNew(80, 63),
          this.dubboProvide.adService.queryAppCmsNew(80, 64),
          this.dubboProvide.adService.queryAppCmsNew(80, 65),
        ].map(promiseItem => {
          // 错误抓出来
          return promiseItem.catch(err => {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
          })
        }),
      )
      const MR = result.slice(0, len)
      // 只有全部数据都请求成功才放入redis
      MR.reduce((b: boolean, item) => {
        if (item.status === 200) {
          callBack.modules.push(...item.result)
        } else {
          // callBack.modules.push()
          this.log.error(`模块dubbo接口调用失败：${item.message}`)
        }
        return b && item.status === 200
      }, true) && this.redis.set('MODULE', JSON.stringify(MR))

      const AR = result.slice(len)
      AR.reduce((b: boolean, item, index) => {
        if (item.status === 200) {
          callBack.ad[adArr[index]] = item.result
        } else {
          this.log.error(`广告位dubbo接口调用失败：${item.message}`)
        }
        return b && item.status === 200
      }, true) && this.redis.set('AD', JSON.stringify(callBack.ad))
    } else {
      callBack.ad = adRes || {}
      callBack.modules = moduleRes || {}
    }
    return callBack
  }

  /**
   * 一般多个dubbo同时查询  先走redis，再走dubbo
   * @param params
   */
  async _multiRequest(params: requestParamsDTO[]): Promise<CallBackDTO> {
    let back: CallBackDTO = {
      code: 200,
      message: '',
      result: {},
    }
    this._getAllModuleData()
    params = params.filter(async item => {
      let isCache = await this.redis.get(item.cache)
      isCache = JSON.parse(isCache) || []
      if (isCache) {
        back.result[item.key] = item.callBack
          ? item.callBack(isCache, item.params)
          : isCache
      }
      return !isCache
    })

    const dubbos = params.map(item => {
      return item.dubbo
    })

    if (dubbos.length) {
      const res = await Promise.all(
        dubbos.map(promiseItem => {
          // 错误抓出来
          return promiseItem.catch(err => {
            return err
          })
        }),
      )
      if (!(res && res.length === params.length) && !back.result) {
        back.code = 500
        back.message = 'dubbo接口调用失败'
      } else {
        params.forEach((item, index) => {
          if (res[index].status === 200) {
            const list = res[index].result || []
            this.redis.set(item.cache, JSON.stringify(list))
            back.result[item.key] = item.callBack
              ? item.callBack(list, item.params)
              : res[index].result
          } else {
            back.message = res[index].message
            this.log.error(`${item.dubbo}调用失败：${res[index].message}`)
          }
        })
      }
    }
    return back
  }

  /**
   * 单个查询通用函数
   * @param fn
   * @param cache
   * @param type
   */
  async _singleRequest(
    fn: Promise<any>,
    cache: string,
    type?: string,
  ): Promise<CallBackDTO> {
    let res: CallBackDTO = {
      result: null,
      code: 200,
      message: '',
    }
    let result = await this.redis.get(cache)
    if (result) {
      res.result = JSON.parse(result) || []
    } else {
      let r = await fn
      if (r.status === 200) {
        this.redis.set(cache, JSON.stringify(r.result))
        res.result = r.result
      }
      res.code = r.status
    }
    type && (res.result = this._filterTypeData(res.result, type))
    return res
  }

  /** 获取首页模块 */
  async getMainModules(type: string): Promise<any> {
    const result = await this._getAllModuleData()
    const modules = this._filterTypeData(
      result.modules.filter(item => {
        return item.moduleGroup === ModuleGroup.INDEX_GAMES
      }),
      type,
    )
    const CmsDTO = result.ad[AdSubType.APP_MAIN_RECOMMEND]
    return { modules, CmsDTO }
  }

  /** 获取首页banner模块 */
  async getMainBanners(type: string): Promise<any> {
    const result = await this._getAllModuleData()
    const bannerModule = this._filterTypeData(
      result.modules.filter(item => {
        return item.moduleGroup === ModuleGroup.INDEX_BANNER
      }),
      type,
    )
    const adRecommend = result.ad[AdSubType.APP_MAIN_COPY_WRITING]
    return { bannerModule, adRecommend }
  }

  /** 查询模块信息 */
  async queryModule(id: string, group: string, type: string): Promise<any> {
    const result = await this._getAllModuleData()
    const res = this._filterTypeData(
      result.modules.filter(item => {
        return item.moduleGroup === group && item.moduleId === id
      }),
      type,
    )
    return res
  }
  /** 查询游戏排名 */
  async queryRank(type: string): Promise<any> {
    const result = await this._getAllModuleData()
    const res = []
    result.modules.forEach(item => {
      res.push(...this._filterTypeData(item.gameList, type))
    })
    return res
  }

  /** 查询游戏详情 ，*/
  async queryGameDetail(id: string, type: string): Promise<any> {
    // 详情页单独缓存吧，毕竟node不适合cpu密集型的
    let gameDetail = await this.redis.get(`GAME_DETAIL_${id}`)
    if (gameDetail) {
      gameDetail = JSON.stringify(gameDetail)
    } else {
      const result = await this._getAllModuleData()
      const res = result.modules.filter(item => {
        return item.gameList.filter(i => {
          return i.gameId === id
        })
      })
      if (res && res.length) {
        this.redis.set()
      }
    }

    // 礼包信息需要去积分查询
  }

  /**
   *分页获取即时活动,活动一定只会有1个吗
   * @param start
   * @param end
   */
  async queryInstantActivity(start: number, end: number): Promise<any> {
    let r = await this.getMainModules('ALL')
    r = r
      .filter(item => {
        return item.moduleType === 'ACTIVITY'
      })
      .slice(start, end)
    return {}
  }

  /**
   * 电竞tab查询
   * 63 推荐小广告  64 小游戏  65 电竞
   */
  async queryGaming(): Promise<any> {
    const result = await this._getAllModuleData()
    return result.ad[AdSubType.APP_TAB_MINI_GAM]
  }

  /**
   * 电竞tab查询
   * 63 推荐小广告  64 小游戏  65 电竞
   */
  async queryMiniGame(): Promise<any> {
    const result = await this._getAllModuleData()
    return result.ad[AdSubType.APP_TAB_GAMING]
  }

  /** 查询资讯信息 */
  async queryNewest(start: number, end: number): Promise<any> {
    const result = await this._getAllModuleData()
    // 此处后端认为只会有1个
    const res: ModuleDTO = result.modules.filter(item => {
      return item.type === ModuleType.INFORMATION
    })[0]
    const infoSize = res ? res.infoList : []
    return {
      infoDtoList: infoSize.slice(start, end),
      listSize: infoSize.length,
      moduleId: res.moduleId,
    }
  }

  /** 查询资讯详情 */
  async queryPageDetail(id: string): Promise<any> {
    const result = await this._getAllModuleData()
    const res: ModuleDTO[] = result.modules.filter(item => {})
    for (const item of result.modules) {
      const res = item.infoList.filter(item => {
        return item.infoId === id
      })
      if (res.length) {
        return res[0].content
      }
    }
    return ''
  }
}
