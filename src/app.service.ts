import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(name: string): string {
    console.log(`Hello ${name}!`)
    return `Hello ${name}!`
  }
}
