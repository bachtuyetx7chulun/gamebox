import { InputType, PartialType } from '@nestjs/graphql'
import { CreateGameroomInput } from './create-gameroom.input'

@InputType()
export class UpdateGameroomInput extends PartialType(CreateGameroomInput) {
  id: number
}
