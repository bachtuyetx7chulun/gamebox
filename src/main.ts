import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  )
  const port = app.get(ConfigService).get('HOST_PORT')
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Describe Gamebox API which includes auth ( RESTFUL ) and the rest of API ( GRAPHQL ) ...')
    .setVersion('1.0')
    .addTag('GAMEBOX API (❁´◡`❁)')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/documentation', app, document)

  await app.listen(port)
}
bootstrap()
