import * as chalk from 'chalk'
import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  namespace: '/tictactoe',
  cors: {
    origin: 'http://localhost:3001',
  },
})
export class TicTacToeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateWay')
  private clientConnected = 0
  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('Initialized')
  }

  handleConnection(client: Socket) {
    this.clientConnected += 1
    this.logger.log(`${client.id} joined - ${chalk.yellow('Online')}: ${this.clientConnected}`)
    this.server.emit('client_online', this.clientConnected)
  }
  handleDisconnect(client: Socket) {
    this.clientConnected <= 0 ? (this.clientConnected = 0) : (this.clientConnected -= 1)
    this.logger.log(`${client.id} got out - ${chalk.yellow('Online')}: ${this.clientConnected}`)
    this.server.emit('client_online', this.clientConnected)
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`Client sent with id: ${client.id}`)
    this.server.emit('message', data)
  }

  @SubscribeMessage('join_game')
  async handleJoinGame(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(client.id)

    this.server.emit('message', data)
  }
}
