import { AuthController } from '@auth/auth.controller'
import { AuthService } from '@auth/auth.service'
import { GoogleStrategy } from '@auth/strategies/google.strategy'
import { jwt } from '@config/constansts'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
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
  providers: [AuthService, GoogleStrategy, PrismaClient],
})
export class AuthModule {}
