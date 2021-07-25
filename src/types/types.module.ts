import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TypesResolver } from './types.resolver'
import { TypesService } from './types.service'

@Module({
  providers: [TypesService, TypesResolver, PrismaClient],
})
export class TypesModule {}
