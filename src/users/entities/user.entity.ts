import { isPrivated } from '@middlewares/base.middleware'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Gameuser } from '@gameusers/entities/gameuser.entity'
import { Role } from '@roles/entities/role.entity'
import { Type } from '@type/entities/type.entity'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Type)
  type: Type

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Role)
  role: Role

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [Gameuser], { nullable: true, defaultValue: [] })
  gameUsers: Gameuser[]

  @Field({ name: 'active', defaultValue: true })
  active: boolean

  @Field({ nullable: true, middleware: [isPrivated] })
  password: string

  @Field({ nullable: true })
  refreshToken: string

  @Field({ name: 'createAt', defaultValue: new Date() })
  createAt: Date

  @Field({ name: 'updateAt', defaultValue: new Date() })
  updateAt: Date
}
