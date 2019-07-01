/**咨询DTO */
export interface InfoDTO {
  // 资讯id
  infoId: String
  // 资讯类型
  type: string
  // 资讯标题
  title: string
  // 资讯副标题
  subTitle: string
  // 图片url,最多5张
  imageURLList: string[]
  // 资讯内容	（type=LINK_URL时，该字段才有值）
  content: string | null
  // 额外信息
  extraInfo: object
}

/**广告位拓展信息 */
export interface ExtendInfoDTO {
  iosMinVersion: string
  iosMaxVersion: string
  androidMaxVersion: string
  androidMinVersion: string
  /** 终端类型（APP展示终端，枚举值：IOS，ANDROID，H5） */
  terminalType: string
  associationId: string
  /** 展示终端 */
  displayTerminal: string
  /** 展示频次 */
  showTimes: string
  whitelistAccount: string
  blacklistAccount: string
  /** 弹窗版本号 */
  popVertion: string
  logoUrl: string
  /** 白名单用户标签 */
  tag: string
  /** 黑名单用户标签 */
  blackTag: string
}

/**广告位DTO */
export interface CmsDTO {
  cmsId: string
  /** 标题 */
  title: string
  /** 英文标题 */
  enName: string
  /** 文字内容 */
  cmsContent: string
  /** 广告链接地址 */
  adUrl: string
  /** 广告图片地址 */
  srcUrl: string
  /** demo地址 */
  demoViewUrl: string
  /** 主类型 */
  masterType: number
  /** 子类型 */
  slaveType: number
  startTime: number
  endTime: number
  createTime: number
  updateTime: number
  cmsDesc: string
  note: string
  status: string
  extendInfo: ExtendInfoDTO
  /**广告来源	（“EPAY”:网易支付； “YD_CHOICE”: 有道智选） */
  advertiseSource: string
  /** 编号 */
  adIndex: number
}

/** 礼包方案DTO */
export interface GiftSchemaDTO {
  giftSchemaId: string
  giftTime: number
  description: string
  giftTerminalType: string
}

/** 咨询图片 */
export interface ElementDTO {
  url: string
  /** PIC - 图片  VIDEO - 视频*/
  type: string
  /** 权重 */
  weight: number
}

/** 游戏额外信息 */
export interface extraInfoDTO {
  md5: string
  fileName: string
  downloadURL: string
  /**IOS做APP内部跳转使用 */
  appSchema: string
  /** app首页图地址 */
  appIndexImag: string
  giftSchemaList: GiftSchemaDTO[]
}

/** 游戏信息模块 */
export interface GameInfoDto {
  gameId: string
  iconSmall: string
  iconBig: string
  gameName: string
  /** 标签（动作 - ACTION  休闲 - CASUAL  角色 - ROLE_PLAY  竞技 - ATHLETIC  策略 - STRATEGY  二次元 – ANIMATION_CULTURE） */
  gameType: string
  simpleDescription: string
  detailedDescription: string
  /** 宣传用语	 */
  slogan: string
  /** 素材的nos地址 */
  elements: ElementDTO[]
  elementsStyle: string
  downloadURLIOS: string
  downloadURLAndroid: string
  /** 游戏预约URL */
  preOrderURL: string
  appTerminalType: string
  /** 状态（上线 – ONLINE  下线 - OFFLINE） */
  status: string
  /** 信息类型	（游戏 - GAME  应用 – APPLICATION） */
  infoType: string
  remark: string
  gameTypeDesc: string
  modulwWeight: number
  backgroundImage: string
  extraInfoDTO: extraInfoDTO
  /** 咨询列表 */
  infoList: InfoDTO[]
}

/** 礼包DTO */
export interface GiftDto {
  giftSchemaId: string
  /** 礼包配置的时间戳 */
  giftTime: number
  gameInfoDTO: GameInfoDto
  /** 是否已领取礼包 */
  hasReceived: boolean
  /** 礼包详情的描述 非用户态为null */
  giftDescription: string | null
  /** 礼包方案 */
  giftInfo: GiftSchemaDTO
  /** 礼包权重 */
  weight: number
}

/** 模块DTO */
export interface ModuleDTO {
  moduleId: string
  moduleName: string
  moduleNameEN: string
  /** 模块分组	（INDEX_BANNER - 首页banner  INDEX_GAMES - 首页推荐游戏  RANKING_LIST - 排行榜） */
  moduleGroup: string
  weight: number
  /** 模块类型	（精选 - CHOICES  推荐 - RECOMMENDED  新游 - NEW  排行榜 - RANKING_LIST）；二期新增：限时活动 - ACTIVITIES  最新礼包 - GIFTS  新鲜资讯 - NEWEST_INFO */
  type: string
  /** 生效时间 */
  validTime: number
  /** 失效时间 */
  expiryTime: number
  /** 游戏列表 */
  gameList: GameInfoDto[]
  /** 咨询列表 */
  infoList: InfoDTO[]
}

/** 返回给前端的得按照这个格式 */
export interface CallBackDTO {
  isSuccess?: boolean
  code: number
  message: string
  result: any
}

export interface requestParamsDTO {
  key: string
  dubbo: Promise<any>
  cache: string
  callBack?: Function
  params?: string
}

export interface RedisBackDTO {
  modules: ModuleDTO[]
  ad: object
}

export interface ActivityParams {
  activityId?: string //活动ID
  activityIdList?: string[] //活动ID列表
  activityType?: string //活动类型
  endTime?: number //活动结束时间
  isWhole?: boolean //是否全场
  name?: string //活动名称
  serialVersionUID?: number
  startTime?: number //活动开始时间
  status?: string //活动状态
}

/** 积分查询基类 */
export class integralBaseDTO {
  beginRowNum: number //分页起始查询行数
  DEFAULT_FIRST_PAGE: number //默认分页查询首页
  DEFAULT_PAGE_SIZE: number //默认每页查询数量
  DEFAULT_TOTAL_ITEM: number //默认分页查询总量
  endRowNum: number //分页终止查询行数
  isNoNeedPaging: boolean //是否需分页
  MAX_PAGE_SIZE: number //每页最大查询限制
  MAX_TOTAL_ITEM: number //最大查询总量限制
  order: string //排序方案，默认倒序
  orderBy: string //排序字段
  pageSize: number //每页大小
  queryPageNo: number //查询页码
  serialVersionUID: number
  totalItem: number //查询总量
}
/**根据条件分页查询活动列表 */
export class promotionUserQueryDto {
  integralBaseDTO: integralBaseDTO
  accountId: string //用户账号
  coreAccountId: string //用户核心账号
  promotionId: string //活动ID
  promotionIdList: string[] //活动ID列表
}

/** 用户信息，解析so获取 */

export class userDTO {
  cookie: string
  //主账号
  ssn: string
  // 用户ip
  p_uid: string
  // 手机号
  mobile: string
  //是否自动登录 1是, 0否
  autologin: string
  createTime?: number
  cookieCreateTime?: number
  alias?: string
  misc?: string
}
