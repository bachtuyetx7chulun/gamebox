/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '@auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  localSignIn(@Req() req) {
    return this.authService.localSignIn(req.user)
  }

  @Post('signup')
  localSignUp(@Req() req) {
    return this.authService.localSignUp(req.body)
  }
}
