import { Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersResolver } from '@users/users.resolver'
import { PrismaClient } from '@prisma/client'

@Module({
  providers: [UsersResolver, UsersService, PrismaClient],
})
export class UsersModule {}
