import { Connection, Repository } from 'typeorm'
import { test } from './test.entity'

export const TestProvide = [
  {
    provide: 'TestRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(test),
    inject: ['DbConnectionToken'],
  },
]
