export default {
  redis: {
    sentinels: [
      {
        port: 26009,
        host: 'wyb-redisyq01-online.db.epay',
      },
      {
        port: 26009,
        host: 'wyb-redisyq02-online.db.epay',
      },
      {
        port: 26009,
        host: 'wyb-redisyq03-online.db.epay',
      },
      {
        port: 26009,
        host: 'wyb-redis01-online.db.epay',
      },
      {
        port: 26009,
        host: 'wyb-redis02-online.db.epay',
      },
      {
        port: 26009,
        host: 'wyb-redis03-online.db.epay',
      },
    ],
    name: 'ew6503',
    password: 'iFZSF1aJRVw3',
    db: 0,
  },
  zk:
    'wyb-zk01-online.yq.epay:2181?backup=wyb-zk02-online.yq.epay:2181,wyb-zk03-online.yq.epay:2181,wyb-zk04-online.yq.epay:2181,wyb-zk05-online.yq.epay:2181',
  zkRoot: 'online-yq',
  httpsKey: './src/config/https/private.pem',
  httpsCert: './src/config/https/ca.cer',
}
