/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Type } from 'src/types/entities/type.entity'

@ObjectType()
export class User {
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

  @Field((type) => Type)
  type: Type

  @Field({ name: 'active', defaultValue: true })
  active: boolean

  @Field({ nullable: true })
  password: string

  @Field({ nullable: true })
  refreshToken: string

  @Field({ name: 'createAt', defaultValue: new Date() })
  createAt: Date

  @Field({ name: 'updateAt', defaultValue: new Date() })
  updateAt: Date
}
