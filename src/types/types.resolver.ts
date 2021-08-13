import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { Type } from './entities/type.entity'
import { TypesService } from './types.service'
import { CreateTypeInput, UpdateTypeInput } from '@type/dto/dto-type.input'

@Resolver(() => Type)
export class TypesResolver {
  constructor(private readonly typesService: TypesService) {}

  @Mutation(() => Type)
  createType(@Args('createTypeInput') createTypeInput: CreateTypeInput) {
    return this.typesService.create(createTypeInput)
  }

  @Mutation(() => Type)
  updateType(@Args('updateTypeInput') updateTypeInput: UpdateTypeInput) {
    return this.typesService.update(updateTypeInput)
  }

  @Mutation(() => Boolean)
  deleteType(@Args('idTypeInput') idTypeInput: number) {
    return this.typesService.delete(idTypeInput)
  }

  @Mutation(() => Boolean)
  activeType(@Args('idTypeInput') idTypeInput: number) {
    return this.typesService.active(idTypeInput)
  }

  @Query(() => [Type], { name: 'types' })
  findAll() {
    return this.typesService.findAll()
  }

  @Query(() => Type, { name: 'type' })
  findOne(@Args('idTypeInput') idTypeInput: number) {
    return this.typesService.findOne(idTypeInput)
  }
}
