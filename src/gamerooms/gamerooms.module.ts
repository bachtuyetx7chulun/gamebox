import { Module } from '@nestjs/common'
import { GameroomsService } from './gamerooms.service'
import { GameroomsResolver } from './gamerooms.resolver'
import { PrismaClient } from '@prisma/client'

@Module({
  providers: [GameroomsResolver, GameroomsService, PrismaClient],
})
export class GameroomsModule {}
