import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesResolver } from './roles.resolver'
import { PrismaClient } from '@prisma/client'

@Module({
  providers: [RolesResolver, RolesService, PrismaClient],
})
export class RolesModule {}
