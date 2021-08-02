import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGameInput {
  @Field()
  name: string

  @Field({ nullable: true })
  description: string

  @Field()
  engine: string
}
