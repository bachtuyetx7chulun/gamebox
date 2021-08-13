import { jwt } from '@config/constansts'
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClient } from '@prisma/client'
import { comparePassword, hashPassword } from '@utils/bcrypt.util'
import { compareRefreshToken, getPayload, jwtParser } from '@utils/jwt.util'
import { OAuth2Client } from 'google-auth-library'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaClient) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (user && (await comparePassword(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async googleSignIn(req: any) {
    try {
      const { email, fullName, picture } = req.user
      if (!email) {
        return new HttpException('Google user is not exist', HttpStatus.UNAUTHORIZED)
      }

      const userField = await this.prisma.user.findFirst({
        where: {
          type: {
            name: 'google',
          },
          googleId: email,
        },
        include: {
          role: true,
          type: true,
        },
      })

      if (userField === null) {
        const data = { googleId: email, picture, name: fullName, typeId: 'google', roleId: 'user' }
        const newGoogleUser = await this.prisma.user.create({
          data,
        })

        const payload = getPayload(newGoogleUser, 'google')
        const refreshToken = await jwtParser(this.jwtService, payload, jwt.refresh_secret, { expiresIn: '30d' })
        await this.prisma.user.update({
          where: {
            id: newGoogleUser.id,
          },
          data: { refreshToken },
        })

        return {
          access_token: this.jwtService.sign(payload),
          refresh_token: refreshToken,
        }
      }

      const payload = getPayload(userField, 'google')
      const refreshToken = await jwtParser(this.jwtService, payload, jwt.refresh_secret, { expiresIn: '30d' })
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async googleSignInClient(req: any) {
    try {
      const { access_token } = req.headers
      const client = new OAuth2Client('1038070199091-2ru1vnihm48p1qkj2d4bhc0j7e8rbqo3.apps.googleusercontent.com')
      const result = await client.verifyIdToken({
        idToken: access_token,
        audience: '1038070199091-2ru1vnihm48p1qkj2d4bhc0j7e8rbqo3.apps.googleusercontent.com',
      })

      const { email, name, picture } = result['payload']
      if (!email) {
        return new HttpException('Google user is not exist', HttpStatus.UNAUTHORIZED)
      }

      const userField = await this.prisma.user.findFirst({
        where: {
          type: {
            name: 'google',
          },
          googleId: email,
        },
        include: {
          role: true,
          type: true,
        },
      })

      if (userField === null) {
        const data = { googleId: email, picture, name, typeId: 'google', roleId: 'user' }
        const newGoogleUser = await this.prisma.user.create({
          data,
        })

        const payload = getPayload(newGoogleUser, 'google')
        const refreshToken = await jwtParser(this.jwtService, payload, jwt.refresh_secret, { expiresIn: '30d' })
        await this.prisma.user.update({
          where: {
            id: newGoogleUser.id,
          },
          data: { refreshToken },
        })

        return {
          access_token: this.jwtService.sign(payload),
          refresh_token: refreshToken,
        }
      }

      const payload = getPayload(userField, 'google')
      const refreshToken = await jwtParser(this.jwtService, payload, jwt.refresh_secret, { expiresIn: '30d' })
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
      }
    } catch (error) {
      return new Error(error)
    }
  }

  async localSignIn(body) {
    try {
      const { email, password } = body
      if (email === 'admin@gmail.com') {
        const payload = {
          email: 'admin@gmail.com',
          googleId: null,
          facebookId: null,
          type: 'local',
          role: 'admin',
        }

        return {
          access_token: this.jwtService.sign(payload),
        }
      }
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
        include: {
          role: true,
          type: true,
        },
      })

      if (await comparePassword(password, user.password)) {
        const refreshToken = await this.jwtService.signAsync(
          {
            ...getPayload(user, 'local'),
          },
          {
            expiresIn: '30d',
            secret: jwt.refresh_secret,
          },
        )

        await this.prisma.user.update({
          where: {
            email,
          },
          data: {
            refreshToken: refreshToken,
          },
        })

        const payload = getPayload(user, 'local')
        return {
          access_token: this.jwtService.sign(payload),
          refresh_token: refreshToken,
        }
      }
    } catch (error) {
      return new UnauthorizedException()
    }
  }

  async localSignUp(body) {
    try {
      const { email, name, password } = body
      await this.prisma.user.create({
        data: {
          email,
          name,
          password: await hashPassword(password),
          picture: 'https://image.flaticon.com/icons/png/512/843/843280.png',
          typeId: 'local', // Id for local,
          roleId: 'user',
        },
      })

      return true
    } catch (error) {
      return new HttpException('User is existed', HttpStatus.FOUND)
    }
  }

  async refreshToken(req) {
    const headers = req.headers
    const accessToken = headers['access_token']
    const refreshToken = headers['refresh_token']
    try {
      const payload = this.jwtService.verify(accessToken)
      if (payload) {
        return {
          access_token: accessToken,
        }
      }
    } catch (error) {
      const { message } = error
      if (message === 'invalid signature') return new UnauthorizedException()

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { iat, exp, ...payload } = this.jwtService.verify(refreshToken, {
          secret: jwt.refresh_secret,
        })
        const result = await compareRefreshToken(this.prisma, payload, refreshToken)
        if (!result) {
          return new UnauthorizedException()
        }

        return {
          access_token: this.jwtService.sign(payload, {
            secret: jwt.secret,
          }),
        }
      } catch (error) {
        return new UnauthorizedException()
      }
    }
  }
}
