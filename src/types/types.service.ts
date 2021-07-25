import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class TypesService {
  constructor(private prisma: PrismaClient) {}

  async create(createTypeInput): Promise<any> {
    const createType = await this.prisma.type.create({
      data: createTypeInput,
    })
    return createType
  }

  async findAll(): Promise<any> {
    const types = await this.prisma.type.findMany({})
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
  }

  async active(idTypeInput): Promise<any> {
    const activeField = await this.prisma.type.update({
      where: {
        id: idTypeInput,
      },
      data: {
        active: false,
      },
    })
    return activeField
  }
}
