import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Type } from '@type/entities/type.entity'

@ObjectType()
export class UserDTO {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  email: string

  @Field({ name: 'picture', defaultValue: 'https://image.flaticon.com/icons/png/512/843/843280.png', nullable: true })
  picture: string

  @Field({ nullable: true })
  googleId: string

  @Field({ nullable: true })
  facebookId: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Type)
  type: Type

  @Field({ name: 'active', defaultValue: true })
  active: boolean

  @Field({ name: 'createAt', defaultValue: new Date() })
  createAt: Date

  @Field({ name: 'updateAt', defaultValue: new Date() })
  updateAt: Date
}
