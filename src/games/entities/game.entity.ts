import { Field, ObjectType } from '@nestjs/graphql'
import { Gameuser } from 'src/gameusers/entities/gameuser.entity'

@ObjectType()
export class Game {
  id: number
  name: string
  description: string
  engine: string
  createAt: Date
  updateAt: Date

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [Gameuser], { nullable: true, defaultValue: [] })
  gameusers: Gameuser[]

  constructor(name: string, engine: string, description: string) {
    this.name = name
    this.engine = engine
    this.description = description
  }
}
