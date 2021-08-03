import { CreateGameInput } from './create-game.input'
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql'

@InputType()
export class UpdateGameInput extends PartialType(OmitType(CreateGameInput, ['name'])) {
  @Field(() => Int)
  id: number
}
