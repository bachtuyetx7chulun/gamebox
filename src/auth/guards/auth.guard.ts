import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { getTokenFromBearer } from '@utils/jwt.util'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const ctx = GqlExecutionContext.create(context)
      const headers = ctx.getContext()['req']['headers']
      const { access_token } = headers
      const recieveToken = getTokenFromBearer(access_token)
      const payload = this.jwtService.verify(recieveToken)
      if (payload) {
        return true
      }
    } catch (error) {
      return false
    }
  }
}
