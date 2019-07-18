declare module NodeJS {
  interface Global {
    redis: any
    requestId: any
  }
}
