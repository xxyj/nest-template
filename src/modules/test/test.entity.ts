import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class test {
  @PrimaryGeneratedColumn()
  id: number = 1

  @Column({ length: 255 })
  name: string

  //   @Column('text')
  //   desc: string

  //   @Column('int')
  //   date: number
}
