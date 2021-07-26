import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClient } from '@prisma/client'
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaClient) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async googleLogin(req: any) {
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
      })

      if (userField === null) {
        const newGoogleUser = await this.prisma.user.create({
          data: {
            googleId: email,
            picture,
            name: fullName,
            typeId: 'google',
          },
        })

        return newGoogleUser
      }
      return userField
    } catch (error) {
      throw new Error(error)
    }
  }

  localSignIn(user) {
    const payload = { username: user.username, sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async localSignUp(body) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...body,
          picture: 'https://image.flaticon.com/icons/png/512/843/843280.png',
          typeId: 'local', // Id for local
        },
      })

      return newUser
    } catch (error) {
      return new HttpException('User is existed', HttpStatus.FOUND)
    }
  }
}
