import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRoleInput } from './dto/create-role.input'
import { UpdateRoleInput } from './dto/update-role.input'
import { Role } from './entities/role.entity'
import { RolesService } from './roles.service'

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role, { nullable: true })
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput)
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll()
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id)
  }

  @Mutation(() => Role, { nullable: true })
  updateGameroom(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput)
  }

  @Mutation(() => Boolean)
  removeRoleById(@Args('id') id: number) {
    return this.rolesService.removeById(id)
  }

  @Mutation(() => Boolean)
  removeRoles() {
    return this.rolesService.removeAll()
  }
}
