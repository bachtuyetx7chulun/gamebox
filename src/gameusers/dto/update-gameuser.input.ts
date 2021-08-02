import { CreateGameuserInput } from './create-gameuser.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGameuserInput extends PartialType(CreateGameuserInput) {
  @Field(() => Int)
  id: number
}
