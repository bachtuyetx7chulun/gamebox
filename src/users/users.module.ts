import { Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersResolver } from '@users/users.resolver'
import { PrismaClient } from '@prisma/client'
import { TypesService } from 'src/types/types.service'

@Module({
  providers: [UsersResolver, UsersService, PrismaClient, TypesService],
})
export class UsersModule {}
