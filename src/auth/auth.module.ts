import { Module } from '@nestjs/common'
import { AuthService } from '@auth/auth.service'
import { AuthController } from '@auth/auth.controller'
import { GoogleStrategy } from '@auth/strategies/google.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
