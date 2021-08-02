import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateGameInput } from './dto/create-game.input'
import { UpdateGameInput } from './dto/update-game.input'
import { Game } from './entities/game.entity'

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaClient) {}

  async create(createGameInput: CreateGameInput) {
    const { name, description, engine } = createGameInput
    const game = new Game(name, engine, description)
    const data = await this.prisma.game.create({
      data: game,
    })

    return data
  }

  async findAll() {
    return await this.prisma.game.findMany({
      include: {
        GameUser: true,
      },
    })
  }

  async findOne(id) {
    const game = await this.prisma.game.findUnique({
      include: {
        GameUser: true,
      },
      where: {
        id,
      },
    })

    return game
  }

  async update(id, updateGameInput: UpdateGameInput) {
    try {
      const { engine, description } = updateGameInput
      const updateField = await this.prisma.game.update({
        where: {
          id,
        },
        data: {
          engine,
          description,
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
