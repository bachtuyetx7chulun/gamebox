import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  // @Field()
  // name: string

  // @Field({ nullable: true })
  // fullName?: string

  // @Field()
  // email: string
}
