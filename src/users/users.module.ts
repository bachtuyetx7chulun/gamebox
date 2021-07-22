import { Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersResolver } from '@users/users.resolver'

@Module({
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
