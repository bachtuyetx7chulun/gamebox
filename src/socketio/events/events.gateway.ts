/* eslint-disable prettier/prettier */
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  namespace: '/',
  cors: {
    origin: 'http://localhost:3001',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  async identity(@MessageBody() data: any, @ConnectedSocket() client) {
    const { handshake } = client
    console.log(handshake)

    this.server.emit('message', data)
  }
}
