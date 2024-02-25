import { ObjectId } from 'mongodb'
import { verifyAccessToken } from './commons'
import { Server } from 'socket.io'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/models/requests/User.requests'
import { UserVerifyStatus } from '~/constants/enums'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import Conversation from '~/models/schemas/Conversation.schema'
import databaseService from '~/services/database.services'
import { Server as ServerHttp } from 'http'

const initSocket = (httpServer: ServerHttp) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000'
    }
  })
  const users: {
    [key: string]: {
      socket_id: string
    }
  } = {}

  // middleware
  io.use(async (socket, next) => {
    const { Authorization } = socket.handshake.auth
    const access_token = Authorization?.split(' ')[1]
    try {
      const decoded_authorization = await verifyAccessToken(access_token)
      const { verify } = decoded_authorization as TokenPayload
      // check user not verified
      if (verify !== UserVerifyStatus.Verified) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGES.USER_NOT_VERIFIED,
          status: HTTP_STATUS.FORBIDDEN
        })
      }
      // pass decode_authorization for socket to use other middlewares
      socket.handshake.auth.decode_authorization = decoded_authorization
      socket.handshake.auth.access_token = access_token
      next()
    } catch (error) {
      // verify authorization not found
      next({
        message: 'Unauthorized',
        name: 'UnauthorizedError',
        data: error
      })
    }
  })

  io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`)
    const { user_id } = socket.handshake.auth.decode_authorization as TokenPayload
    users[user_id] = {
      socket_id: socket.id
    }
    console.log(users)
    //middleware socket check each sends message time
    socket.use(async (_, next) => {
      const { access_token } = socket.handshake.auth
      try {
        await verifyAccessToken(access_token)
        next()
      } catch (error) {
        next(new Error('Unauthorized'))
      }
    })

    socket.on('error', (err) => {
      if (err.message === 'Unauthorized') {
        socket.disconnect()
      }
    })

    socket.on('send_message', async ({ payload }) => {
      const { content, sender_id, receiver_id } = payload
      const receiver_socket_id = users[receiver_id]?.socket_id

      const conversation = new Conversation({
        sender_id: new ObjectId(sender_id),
        receiver_id: new ObjectId(receiver_id),
        content: content
      })
      const result = await databaseService.conversations.insertOne(conversation)
      conversation._id = result.insertedId
      if (receiver_socket_id) {
        socket.to(receiver_socket_id).emit('receive_message', {
          payload: conversation
        })
      }
    })
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
      delete users[user_id]
    })

    // get message with event "greeting" from client
    socket.on('greeting', (arg) => {
      console.log(arg)
    })

    // send message with event "reply" to client
    socket.emit('reply', 'I am websocket server')
  })
}

export default initSocket
