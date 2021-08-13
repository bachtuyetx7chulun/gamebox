import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateGameRoomInput } from './dto/create-gameroom.input'
import { UpdateGameRoomInput } from './dto/update-gameroom.input'

@Injectable()
export class GameroomsService {
  constructor(private prisma: PrismaClient) {}

  async create(createGameRoomInput: CreateGameRoomInput) {
    const { gameId, name } = createGameRoomInput
    const room = await this.prisma.gameRoom.create({
      data: {
        name,
        gameId,
      },
    })
    return room
  }

  async findAll() {
    return await this.prisma.gameRoom.findMany({})
  }

  async findOne(id: number) {
    const gameRoom = await this.prisma.gameRoom.findUnique({
      include: {
        gameUsers: true,
      },
      where: {
        id,
      },
    })
    return gameRoom
  }

  async update(id: number, updateGameroomInput: UpdateGameRoomInput) {
    try {
      const { name, playerCount } = updateGameroomInput
      const updateField = await this.prisma.gameRoom.update({
        where: {
          id,
        },
        data: {
          name,
          playerCount,
          updateAt: new Date(),
        },
      })

      return updateField
    } catch (error) {
      return new Error(error)
    }
  }

  async removeById(id) {
    try {
      await this.prisma.gameRoom.delete({
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
      await this.prisma.gameRoom.deleteMany({})
      return true
    } catch (error) {
      return false
    }
  }
}
