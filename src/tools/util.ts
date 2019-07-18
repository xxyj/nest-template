/**
 * 工具类函数
 */
/**
 *  枚举转成数组
 * @param en
 */
export function enumToArray(en: object): any[] {
  return Object.keys(en)
}
/**
 * 模拟java的getBytes方法
 * @param str
 */
export function getBytes(str: string) {
  var utf8 = unescape(encodeURIComponent(str))
  var arr = []

  for (var i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i))
  }
  return arr
}

/**
 * 获取IP地址
 * @param req
 */
export function getIp(req) {
  var ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    ''
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip
}

/**
 * 生成uuid
 */
export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
