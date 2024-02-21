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
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }
  console.log(users)
  socket.on('private message', (arg) => {
    const receiver_socket_id = users[arg.to].socket_id
    socket.to(receiver_socket_id).emit('receive private message', {
      content: arg.content,
      from: user_id
    })
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
