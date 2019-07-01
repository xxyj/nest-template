import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, InsertResult } from 'typeorm'
import { test } from './test.entity'

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(test)
    private readonly testRepository: Repository<test>,
  ) {}

  async findAll(): Promise<test[]> {
    return await this.testRepository.find()
  }

  async insert(name): Promise<InsertResult> {
    const res = await this.testRepository.insert({
      name,
    })
    return res
  }
}
