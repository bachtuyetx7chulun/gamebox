import { bcrypt } from '@config/constansts'
import { hashSync, compareSync } from 'bcrypt'

export const hashPassword = async (password: string) => {
  return await hashSync(password, bcrypt.hash)
}

export const comparePassword = async (password: string, hash: string) => {
  return await compareSync(password, hash)
}
