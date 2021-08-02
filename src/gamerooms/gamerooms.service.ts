import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UpdateGameroomInput } from './dto/update-gameroom.input'
import { Gameroom } from './entities/gameroom.entity'

@Injectable()
export class GameroomsService {
  constructor(private prisma: PrismaClient) {}

  async create(roomName) {
    const roomData = new Gameroom(roomName)
    const room = await this.prisma.gameRoom.create({
      data: roomData,
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

  async update(id: number, updateGameroomInput: UpdateGameroomInput) {
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
