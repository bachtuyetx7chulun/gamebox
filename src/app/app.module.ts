import { AuthModule } from './../auth/auth.module'
import configuration from '@config/configuration'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from '@users/users.module'
import { TypesModule } from '@type/types.module'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypesModule,
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
