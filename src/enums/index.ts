/**
 * 模块类型
 **/
export enum ModuleType {
  // 精选
  CHOICE = 'CHOICES',
  // 推荐
  RECOMMENDED = 'RECOMMENDED',
  // 新游
  NEW = 'NEW',
  // 排行榜
  RANKING_LIST = 'RANKING_LIST',
  // 首屏banner
  INDEX_PAGE_BANNER = 'INDEX_PAGE_BANNER',
  // 活动
  ACTIVITY = 'ACTIVITY',
  // 游戏礼包
  GAME_GIFTS = 'GAME_GIFTS',
  // 资讯
  INFORMATION = 'INFORMATION',
  // APP首页
  APP_INDEX = 'APP_INDEX',
}

/** app类型 */
export enum AppType {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  ALL = 'ALL',
}

// 模块组
export enum ModuleGroup {
  // Banner
  INDEX_BANNER = 'INDEX_BANNER',
  // 模块
  INDEX_GAMES = 'INDEX_GAMES',
  //  发现
  DISCOVERY = 'DISCOVERY',
  //  排行
  RANKING_LIS = 'RANKING_LIST',
}

export enum AdSubType {
  //app首页文案
  APP_MAIN_COPY_WRITING = 61,
  //app首页banner位
  APP_MAIN_BANNER,
  //app首页推荐广告位
  APP_MAIN_RECOMMEND,
  //电竞tab广告位
  APP_TAB_MINI_GAM,
  //小游戏tab广告位
  APP_TAB_GAMING,
}
