import { Game } from '@games/entities/game.entity'
import { Gameuser } from '@gameusers/entities/gameuser.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Gameroom {
  id: number
  name: string
  createAt: Date
  updateAt: Date

  @Field({ nullable: true })
  playerCount: number

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Game, { nullable: true })
  game: Game

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [Gameuser], { defaultValue: [], nullable: true })
  gameUsers: Gameuser[]

  constructor(name: string) {
    this.name = name
    this.playerCount = 0
  }
}
