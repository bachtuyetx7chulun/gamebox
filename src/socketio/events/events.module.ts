import { Module } from '@nestjs/common'
import { TicTacToeModule } from '@socketio/games/tic-tac-toe/tic-tac-toe.module'
import { EventsGateway } from './events.gateway'

@Module({
  providers: [EventsGateway],
  imports: [TicTacToeModule],
})
export class EventsModule {}
