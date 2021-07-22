import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { ConfigService } from '@nestjs/config'
import * as chalk from 'chalk'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({}))
  const port = app.get(ConfigService).get('HOST_PORT')
  await app.listen(port, () => {
    console.log(`${chalk.green('Server is running on port')} ${chalk.yellow(port)} `)
  })
}
bootstrap()
