import { InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreateGameRoomInput } from './create-gameroom.input'

@InputType()
export class UpdateGameRoomInput extends PartialType(OmitType(CreateGameRoomInput, ['gameId'])) {
  id: number
}
