/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthService } from '@auth/auth.service'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger'
import { SignInDTO, SignUpDTO } from './dto/auth.dto'

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
    return this.authService.googleSignIn(req)
  }

  @Post('signin')
  @ApiResponse({ status: 200, description: 'Return access_token and refresh_token' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: SignInDTO })
  localSignIn(@Body() signInDTO: SignInDTO) {
    return this.authService.localSignIn(signInDTO)
  }

  @Post('signup')
  @ApiResponse({ status: 201, description: 'True' })
  @ApiResponse({ status: 403, description: 'User is exist' })
  @ApiBody({ type: SignUpDTO })
  localSignUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.localSignUp(signUpDTO)
  }

  @Get('refresh')
  @ApiHeader({
    name: 'access_token',
    description: 'Enter your token here',
  })
  @ApiHeader({
    name: 'refresh_token',
    description: 'Enter your token here',
  })
  @ApiResponse({ status: 200, description: 'recieva a new access_token if current token is experied or current token' })
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req)
  }
}
