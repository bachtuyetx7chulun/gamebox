import { jwt } from '@config/constansts'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaClient } from '@prisma/client'
import { UsersResolver } from '@users/users.resolver'
import { UsersService } from '@users/users.service'
import { TypesService } from 'src/types/types.service'

@Module({
  imports: [
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UsersResolver, UsersService, PrismaClient, TypesService],
})
export class UsersModule {}
