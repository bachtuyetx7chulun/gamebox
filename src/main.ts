import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = app.get(ConfigService).get('HOST_PORT')
  await app.listen(port)
}
bootstrap()
