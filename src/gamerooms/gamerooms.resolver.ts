import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateGameRoomInput } from './dto/create-gameroom.input'
import { UpdateGameRoomInput } from './dto/update-gameroom.input'
import { Gameroom } from './entities/gameroom.entity'
import { GameroomsService } from './gamerooms.service'

@Resolver(() => Gameroom)
export class GameroomsResolver {
  constructor(private readonly gameroomsService: GameroomsService) {}

  @Mutation(() => Gameroom)
  createGameroom(@Args('createGameRoomInput') createGameRoomInput: CreateGameRoomInput) {
    return this.gameroomsService.create(createGameRoomInput)
  }

  @Query(() => [Gameroom], { name: 'gamerooms' })
  findAll() {
    return this.gameroomsService.findAll()
  }

  @Query(() => Gameroom, { name: 'gameroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameroomsService.findOne(id)
  }

  @Mutation(() => Gameroom)
  updateGameroom(@Args('updateGameroomInput') updateGameroomInput: UpdateGameRoomInput) {
    return this.gameroomsService.update(updateGameroomInput.id, updateGameroomInput)
  }

  @Mutation(() => Boolean)
  removeGameroomById(@Args('id', { type: () => Int }) id: number) {
    return this.gameroomsService.removeById(id)
  }

  @Mutation(() => Boolean)
  removeGamerooms() {
    return this.gameroomsService.removeAll()
  }
}
