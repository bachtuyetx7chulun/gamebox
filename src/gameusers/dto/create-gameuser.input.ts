import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGameuserInput {
  @Field()
  name: string

  @Field()
  gameId: number

  @Field({ nullable: true })
  userId: number

  @Field({ nullable: true })
  gameRoomId: number
}
