import { AuthGuard } from '@auth/guards/auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'
import { UserDTO } from './dto/user.dto'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id)
  }

  @Mutation(() => Boolean)
  removeAllUser() {
    return this.usersService.deleteAllUser()
  }

  @Query(() => UserDTO, { name: 'profile' })
  @UseGuards(AuthGuard)
  getProfile(@Args('access_token') access_token: string) {
    return this.usersService.getProfile(access_token)
  }
}
