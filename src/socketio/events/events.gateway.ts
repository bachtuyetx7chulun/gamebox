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
  namespace: '/',
  cors: {
    origin: 'http://localhost:3001',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateWay')
  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('Initialized')
  }

  handleConnection(client: Socket) {
    this.logger.log(`lient connecter ${client.id}`)
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`lient disconnected ${client.id}`)
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // const { handshake } = client
    client.join('123')
    // console.log({
    //   client: client.id,
    //   message: data,
    //   time: Date.now(),
    // })
    console.log(this.server.adapter)

    // this.server.emit('message', data)
  }
}
