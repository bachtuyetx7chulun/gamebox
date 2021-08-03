import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@users/entities/user.entity'

@ObjectType()
export class Role {
  id: number
  name: string
  active: boolean
  description: string
  createAt: Date
  updateAt: Date

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [User], { defaultValue: [], nullable: true })
  users: User[]

  constructor(name: string, description: string) {
    this.name = name
    this.description = description
  }
}
