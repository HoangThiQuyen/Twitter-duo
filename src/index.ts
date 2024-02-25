import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likeRoutes from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import './utils/s3'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Conversation from './models/schemas/Conversation.schema'
import conversationsRouter from './routes/conversations.routes'
import { ObjectId } from 'mongodb'
import { verifyAccessToken } from './utils/commons'
import { USERS_MESSAGES } from './constants/messages'
import { TokenPayload } from './models/requests/User.requests'
import { UserVerifyStatus } from './constants/enums'
import { ErrorWithStatus } from './models/Errors'
import HTTP_STATUS from './constants/httpStatus'
// import './utils/fake'

config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
const app = express()
// create server for socket
const httpServer = createServer(app)
const port = process.env.PORT || 4000
app.use(cors())

//create uploads folder
initFolder()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediaRouter)

//lấy đường dẫn tuyệt đối để hiển thị đường url image
// C1:
// app.use('/static', express.static(UPLOAD_IMAGE_DIR))
// C2: có thể custom( thêm middle để bắt lỗi) và cấu hình thêm
app.use('/static', staticRouter)
// Do static thường chỉ xử lý hiển thị được với image nên phải dùng streaming video của express để static video
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likeRoutes)
app.use('/search', searchRouter)
app.use('/conversations', conversationsRouter)

app.use(defaultErrorHandler)

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

httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
