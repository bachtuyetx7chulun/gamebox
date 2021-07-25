import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@users/entities/user.entity'

@ObjectType()
export class Type {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  acronym: string

  @Field()
  active: boolean

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [User], { defaultValue: [], nullable: true })
  users: User[]

  @Field()
  createAt: Date

  @Field()
  updateAt: Date
}
