// 本地环境直接用的话需要绑定vpn
export default {
  redis: {
    sentinels: [
      {
        port: 26379,
        host: '10.165.124.79',
      },
    ],
    name: 'mymaster',
    password: '123456',
    db: 0,  
    keyPrefix: 'node-game-',
  },
  // 本地没有，暂时使用其他环境
  zk: '223.252.220.187:2181',
  zkRoot: 'testnot', //36环境testnot 35环境qatest
  userSoPath: './src/lib/libcom_netease_urs_ntescode.so',
}
