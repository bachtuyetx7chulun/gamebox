import { Module } from '@nestjs/common'
import { TicTacToeGateway } from './tic-tac-toe.gateway'

@Module({
  providers: [TicTacToeGateway],
})
export class TicTacToeModule {}
