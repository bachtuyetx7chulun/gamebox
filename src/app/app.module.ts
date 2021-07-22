import { AuthModule } from './../auth/auth.module'
import { UsersModule } from '@users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '@config/configuration'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
