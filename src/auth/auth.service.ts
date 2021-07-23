import { Injectable } from '@nestjs/common'
// import { CreateAuthDto } from './dto/create-auth.dto'
// import { UpdateAuthDto } from './dto/update-auth.dto'

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user,
    }
  }
}
