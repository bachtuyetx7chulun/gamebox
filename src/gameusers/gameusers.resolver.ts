import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GameusersService } from './gameusers.service'
import { Gameuser } from './entities/gameuser.entity'
import { CreateGameuserInput } from './dto/create-gameuser.input'
import { UpdateGameuserInput } from './dto/update-gameuser.input'

@Resolver(() => Gameuser)
export class GameusersResolver {
  constructor(private readonly gameusersService: GameusersService) {}

  @Mutation(() => Gameuser, { nullable: true })
  createGameuser(@Args('createGameuserInput') createGameuserInput: CreateGameuserInput) {
    return this.gameusersService.create(createGameuserInput)
  }

  @Query(() => [Gameuser], { name: 'gameusers' })
  findAll() {
    return this.gameusersService.findAll()
  }

  @Query(() => Gameuser, { name: 'gameuser', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameusersService.findOne(id)
  }

  @Mutation(() => Gameuser, { nullable: true })
  updateGameuser(@Args('updateGameuserInput') updateGameuserInput: UpdateGameuserInput) {
    return this.gameusersService.update(updateGameuserInput.id, updateGameuserInput)
  }

  @Mutation(() => Boolean, { nullable: true })
  removeGameuserById(@Args('id', { type: () => Int }) id: number) {
    return this.gameusersService.removeById(id)
  }

  @Mutation(() => Boolean, { nullable: true })
  removeGameusers() {
    return this.gameusersService.removeAll()
  }
}
