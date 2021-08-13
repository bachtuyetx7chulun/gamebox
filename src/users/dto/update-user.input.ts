import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field()
  id: number

  @Field({ nullable: true })
  roleId: string

  @Field({ nullable: true })
  password: string

  @Field({ nullable: true })
  active: boolean

  @Field({ nullable: true })
  picture: string

  @Field({ nullable: true })
  name: string
}
