import http from 'http'
import { Server } from 'socket.io'
import { initConsumer } from './kafka/consumer.js'

export const setupRealtime = async (app) => {
  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  // Initialize Kafka consumer
  await initConsumer(io)

  // Listen for WebSocket connections
  io.on('connection', (socket) => {
    console.log('⚡ WebSocket client connected')
  })

  return server
}
