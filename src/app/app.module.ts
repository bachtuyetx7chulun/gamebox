import * as depthLimit from 'graphql-depth-limit'
import { applyMiddleware } from 'graphql-middleware'
import { GraphQLSchema } from 'graphql'
import { Module } from '@nestjs/common'
import configuration from '@config/configuration'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { RolesModule } from '@roles/roles.module'
import { TypesModule } from '@type/types.module'
import { UsersModule } from '@users/users.module'
import { AuthModule } from '@auth/auth.module'
import { GameusersModule } from '@gameusers/gameusers.module'
import { GameroomsModule } from '@gamerooms/gamerooms.module'
import { GamesModule } from '@games/games.module'
import { ComplexityPlugin } from 'src/plugins/complexity.plugin'
import { permissions } from '@auth/permissions/base.permission'
import { EventsModule } from '@socketio/events/events.module'

@Module({
  imports: [
    EventsModule,
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
      playground: true,
      validationRules: [depthLimit(3)],
      transformSchema: (schema: GraphQLSchema) => {
        schema = applyMiddleware(schema, permissions)
        return schema
      },
    }),
  ],
  providers: [ComplexityPlugin],
})
export class AppModule {}
