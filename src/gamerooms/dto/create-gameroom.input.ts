import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGameRoomInput {
  @Field()
  name: string

  @Field()
  gameId: number

  @Field({ defaultValue: 0, nullable: true })
  playerCount: number
}
