// 本地环境直接用的话需要绑定vpn
export default {
  redis: {
    sentinels: [
      {
        port: 26900,
        host: 'redis.dev.163.com',
      },
    ],
    name: 'test6379',
    password: 'wyb_redis_test',
    db: 0,
  },
  zk: 'zookeeper.dev.163.com:2181',
  zkRoot: 'dev',
  httpsKey: './src/lib/https/private.pem',
  httpsCert: './src/lib/https/ca.cer',
  
}
