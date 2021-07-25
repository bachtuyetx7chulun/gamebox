import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTypeInput {
  @Field()
  name: string

  @Field()
  acronym: string

  @Field({ nullable: true })
  description?: string
}

@InputType()
export class UpdateTypeInput {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  acronym: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active: boolean

  @Field({ defaultValue: new Date(), nullable: true })
  updateAt: Date
}
