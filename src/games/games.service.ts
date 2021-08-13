import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateGameInput } from './dto/create-game.input'
import { UpdateGameInput } from './dto/update-game.input'
import { Game } from './entities/game.entity'

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaClient) {}

  async create(createGameInput: CreateGameInput) {
    try {
      const { name, description, platform, picture } = createGameInput
      const game = new Game(name, platform, description, picture)

      const data = await this.prisma.game.create({
        data: { ...game },
      })

      return data
    } catch (error) {
      return error
    }
  }

  async findAll() {
    return await this.prisma.game.findMany({
      include: {
        gameUsers: true,
        gameRooms: true,
      },
    })
  }

  async findOne(id) {
    const game = await this.prisma.game.findUnique({
      include: {
        gameRooms: true,
        gameUsers: true,
      },
      where: {
        id,
      },
    })

    return game
  }

  async update(id, updateGameInput: UpdateGameInput) {
    try {
      const { platform, description, picture } = updateGameInput
      const updateField = await this.prisma.game.update({
        where: {
          id,
        },
        data: {
          platform,
          description,
          picture,
        },
      })

      return updateField
    } catch (error) {
      return null
    }
  }

  async removeById(id) {
    try {
      await this.prisma.game.deleteMany({
        where: {
          id,
        },
      })
      return true
    } catch (error) {
      return false
    }
  }

  async removeAll() {
    try {
      await this.prisma.game.deleteMany({})
      return true
    } catch (error) {
      return false
    }
  }
}
