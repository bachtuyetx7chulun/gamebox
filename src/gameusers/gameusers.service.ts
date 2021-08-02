import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateGameuserInput } from './dto/create-gameuser.input'
import { UpdateGameuserInput } from './dto/update-gameuser.input'

@Injectable()
export class GameusersService {
  constructor(private prisma: PrismaClient) {}

  async create(createGameuserInput: CreateGameuserInput) {
    try {
      const { gameId, gameRoomId, name, userId } = createGameuserInput
      const gameFiled = await this.prisma.game.findUnique({ where: { id: gameId } })
      if (gameFiled) {
        const gameUser = await this.prisma.gameUser.create({
          data: {
            name,
            gameId,
            gameRoomId,
            userId,
          },
          include: {
            gameRoom: true,
            user: true,
            game: true,
          },
        })

        return gameUser
      }
    } catch (error) {
      return null
    }
  }

  findAll() {
    return this.prisma.gameUser.findMany({
      include: {
        game: true,
        gameRoom: true,
        user: true,
      },
    })
  }

  findOne(id: number) {
    try {
      return this.prisma.gameUser.findUnique({
        where: {
          id,
        },
        include: {
          game: true,
          gameRoom: true,
          user: true,
        },
      })
    } catch (error) {
      return null
    }
  }

  async update(id: number, updateGameuserInput: UpdateGameuserInput) {
    try {
      const { name, gameRoomId } = updateGameuserInput
      const updateField = await this.prisma.gameUser.update({
        where: {
          id,
        },
        data: {
          name,
          gameRoomId,
        },
      })

      return updateField
    } catch (error) {
      return null
    }
  }

  async removeAll() {
    try {
      await this.prisma.gameUser.deleteMany({})
      return true
    } catch (error) {
      return false
    }
  }

  async removeById(id: number) {
    try {
      await this.prisma.gameUser.delete({
        where: {
          id,
        },
      })

      return true
    } catch (error) {
      return false
    }
  }
}
