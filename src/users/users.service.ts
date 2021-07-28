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
      },
    })
    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  async deleteAllUser() {
    await this.prisma.user.deleteMany({})
    return true
  }

  async getProfile(access_token) {
    const token = getTokenFromBearer(access_token)
    const payload = this.jwtService.verify(token)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, googleId, facebookId, type } = payload

    if (type === 'local') {
      const user = await this.prisma.user.findFirst({
        where: { email },
        include: {
          type: true,
        },
      })

      return user
    }

    if (type === 'google') {
      const user = await this.prisma.user.findFirst({
        where: { googleId },
        include: {
          type: true,
        },
      })

      return user
    }

    if (type === 'facebook') {
      const user = await this.prisma.user.findFirst({
        where: { facebookId },
        include: {
          type: true,
        },
      })

      return user
    }

    return new UnauthorizedException()
  }
}
