import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createUserInput: CreateUserInput) {
    return 'This action return new user'
  }

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
