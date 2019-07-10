export class userDto {
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
