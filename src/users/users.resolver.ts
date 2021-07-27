import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from '@users/users.service'
import { User } from '@users/entities/user.entity'
import { CreateUserInput } from '@users/dto/create-user.input'
import { UpdateUserInput } from '@users/dto/update-user.input'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id)
  }

  @Mutation(() => Boolean)
  removeAllUser() {
    return this.usersService.deleteAllUser()
  }
}
