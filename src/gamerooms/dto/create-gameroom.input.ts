import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGameroomInput {
  @Field()
  name: string

  @Field()
  playerCount: number
}
