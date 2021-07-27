import { Module } from '@nestjs/common'
import { AuthService } from '@auth/auth.service'
import { AuthController } from '@auth/auth.controller'
import { GoogleStrategy } from '@auth/strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwt } from '@config/constansts'
import { LocalStrategy } from './strategies/local.strategy'
import { PrismaClient } from '@prisma/client'
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, LocalStrategy, PrismaClient],
})
export class AuthModule {}
