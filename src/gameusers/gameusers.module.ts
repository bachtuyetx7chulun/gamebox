import { Module } from '@nestjs/common'
import { GameusersService } from './gameusers.service'
import { GameusersResolver } from './gameusers.resolver'
import { PrismaClient } from '@prisma/client'

@Module({
  providers: [GameusersResolver, GameusersService, PrismaClient],
})
export class GameusersModule {}
