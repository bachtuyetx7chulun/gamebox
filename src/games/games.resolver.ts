import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GamesService } from './games.service'
import { Game } from './entities/game.entity'
import { CreateGameInput } from './dto/create-game.input'
import { UpdateGameInput } from './dto/update-game.input'

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gamesService.create(createGameInput)
  }

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gamesService.findAll()
  }

  @Query(() => [Game], { name: 'game' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.findOne(id)
  }

  @Mutation(() => Game, { nullable: true })
  updateGameroom(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gamesService.update(updateGameInput.id, updateGameInput)
  }

  @Mutation(() => Boolean)
  removeGameById(@Args('id') id: number) {
    return this.gamesService.removeById(id)
  }

  @Mutation(() => Boolean)
  removeGames() {
    return this.gamesService.removeAll()
  }
}
