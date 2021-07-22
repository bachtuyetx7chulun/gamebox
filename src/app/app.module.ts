import { Module } from '@nestjs/common'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
