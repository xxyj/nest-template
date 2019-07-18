export default {
  redis: {
    sentinels: [
      {
        port: 26009,
        host: '10.165.177.90',
      },
    ],
    password: 'BgN91zKgnBLk',
    name: 'test6009',
    db: 0,
  },
  zk: '10.165.124.105:2181,10.165.187.99:2181',
  // zk: '10.165.136.135:2181,10.165.136.180:2181,10.165.177.21:2181',
  zkRoot: 'qatest',
  httpsKey: './src/lib/https/private.pem',
  httpsCert: './src/lib/https/ca.cer',
}
