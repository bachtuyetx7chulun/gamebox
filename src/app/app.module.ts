import configuration from '@config/configuration'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { RolesModule } from '@roles/roles.module'
import { TypesModule } from '@type/types.module'
import { UsersModule } from '@users/users.module'
import { AuthModule } from '@auth/auth.module'
import { GameusersModule } from '@gameusers/gameusers.module'
import { GameroomsModule } from '@gamerooms/gamerooms.module'
import { GamesModule } from '@games/games.module'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    RolesModule,
    GamesModule,
    GameusersModule,
    GameroomsModule,
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
