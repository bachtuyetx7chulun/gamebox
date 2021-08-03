import { Gameroom } from '@gamerooms/entities/gameroom.entity'
import { Game } from '@games/entities/game.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@users/entities/user.entity'

@ObjectType()
export class Gameuser {
  id: number
  name: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Gameroom, { nullable: true })
  gameRoom: Gameroom

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => User, { nullable: true })
  user: User

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Game, { nullable: true })
  game: Game
}
