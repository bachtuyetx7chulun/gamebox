import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRoleInput {
  @Field({ nullable: false })
  name: string

  @Field({ nullable: true })
  description: string
}
