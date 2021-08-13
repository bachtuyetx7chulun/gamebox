import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class TypesService {
  constructor(private prisma: PrismaClient) {}

  async create(createTypeInput): Promise<any> {
    try {
      const createType = await this.prisma.type.create({
        data: createTypeInput,
      })
      return createType
    } catch (error) {
      return new HttpException('This type is existed', HttpStatus.FOUND)
    }
  }

  async findAll(): Promise<any> {
    const types = await this.prisma.type.findMany({
      include: {
        users: true,
      },
    })
    return types
  }

  async findOne(idTypeInput): Promise<any> {
    const typeField = await this.prisma.type.findFirst({ where: { id: idTypeInput } })
    return typeField
  }

  async update(updateTypeInput): Promise<any> {
    const { id, ...rest } = updateTypeInput
    const updateType = await this.prisma.type.update({
      data: rest,
      where: {
        id,
      },
    })
    return updateType
  }

  async delete(idTypeInput): Promise<any> {
    try {
      const { active } = await this.prisma.type.findFirst({ where: { id: idTypeInput } })
      if (active) {
        await this.prisma.type.update({
          where: {
            id: idTypeInput,
          },
          data: {
            active: false,
          },
        })
        return false
      } else {
        await this.prisma.type.delete({ where: { id: idTypeInput } })
        return true
      }
    } catch (error) {
      return false
    }
  }

  async active(idTypeInput): Promise<any> {
    try {
      await this.prisma.type.update({
        where: {
          id: idTypeInput,
        },
        data: {
          active: true,
        },
      })
      return true
    } catch (error) {
      return false
    }
  }
}
