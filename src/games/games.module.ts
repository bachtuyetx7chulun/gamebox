import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesResolver } from './games.resolver'
import { PrismaClient } from '@prisma/client'

@Module({
  providers: [GamesResolver, GamesService, PrismaClient],
})
export class GamesModule {}
