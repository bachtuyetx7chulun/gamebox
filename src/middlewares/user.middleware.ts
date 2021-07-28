import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'

export const userMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  const value = await next()
  console.log(value)
  if (value) return value
}
