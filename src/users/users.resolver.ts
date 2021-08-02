import { AuthGuard } from '@auth/guards/auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
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

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.usersService.findOne(name)
  }

  @Mutation(() => Boolean)
  removeUsers() {
    return this.usersService.removeUsers()
  }

  @Mutation(() => Boolean)
  removeUserById(@Args('id') id: number) {
    return this.usersService.removeUserById(id)
  }

  @Query(() => UserDTO, { name: 'profile' })
  @UseGuards(AuthGuard)
  getProfile(@Args('access_token') access_token: string) {
    return this.usersService.getProfile(access_token)
  }
}
