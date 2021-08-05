import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UpdateRoleInput } from './dto/update-role.input'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaClient) {}

  async create(createRoleInput: any) {
    try {
      const { name, description } = createRoleInput
      if (name === '') return null
      const role = new Role(name, description)
      const data = await this.prisma.role.create({
        data: role,
      })

      return data
    } catch (error) {
      return null
    }
  }

  async findAll() {
    return await this.prisma.role.findMany({
      include: {
        users: true,
      },
    })
  }

  async findOne(id) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    })

    return role
  }

  async update(id, updateRoleInput: UpdateRoleInput) {
    try {
      const { description, name } = updateRoleInput
      const updateField = await this.prisma.role.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          updateAt: new Date(),
        },
      })
      return updateField
    } catch (error) {
      return null
    }
  }

  async removeById(id) {
    try {
      await this.prisma.role.delete({
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
      await this.prisma.role.deleteMany({})
      return true
    } catch (error) {
      return false
    }
  }
}
