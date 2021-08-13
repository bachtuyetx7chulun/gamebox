import { Gameroom } from '@gamerooms/entities/gameroom.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Gameuser } from 'src/gameusers/entities/gameuser.entity'

@ObjectType()
export class Game {
  id: number
  name: string
  description: string
  picture: string
  platform: string
  createAt: Date
  updateAt: Date

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [Gameroom], { nullable: true, defaultValue: [] })
  gameRooms: Gameroom[]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [Gameuser], { nullable: true, defaultValue: [] })
  gameUsers: Gameuser[]

  constructor(name: string, platform: string, description: string, picture?: string) {
    this.name = name
    this.platform = platform
    this.description = description
    this.picture = picture || ''
  }
}
