import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClient } from '@prisma/client'
import { getTokenFromBearer } from '@utils/jwt.util'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        type: true,
        role: true,
        gameUsers: true,
      },
    })

    return users
  }

  async findOne(name: string) {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              email: name,
            },
            {
              googleId: name,
            },
            {
              facebookId: name,
            },
          ],
        },
        include: {
          gameUsers: true,
          role: true,
          type: true,
        },
      })

      return user
    } catch (error) {
      return null
    }
  }

  async removeUsers() {
    try {
      await this.prisma.user.deleteMany({})
      return true
    } catch (error) {
      return false
    }
  }

  async removeUserById(id) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      })
      return true
    } catch (error) {
      return false
    }
  }

  async getProfile(access_token) {
    try {
      const token = getTokenFromBearer(access_token)
      const payload = this.jwtService.verify(token)
      console.log(payload)

      const { email, googleId, facebookId, type } = payload

      if (type === 'local') {
        const user = await this.prisma.user.findFirst({
          where: { email },
          include: {
            type: true,
            role: true,
            gameUsers: true,
          },
        })

        return user
      }

      if (type === 'google') {
        const user = await this.prisma.user.findFirst({
          where: { googleId },
          include: {
            type: true,
            role: true,
            gameUsers: true,
          },
        })

        return user
      }

      if (type === 'facebook') {
        const user = await this.prisma.user.findFirst({
          where: { facebookId },
          include: {
            type: true,
            role: true,
            gameUsers: true,
          },
        })

        return user
      }
    } catch (error) {
      return new UnauthorizedException()
    }
  }
}
