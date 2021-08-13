import { HttpException, HttpStatus } from '@nestjs/common'
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isPrivated: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  return new HttpException('The field is privated', HttpStatus.FORBIDDEN)
}
