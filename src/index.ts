import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import cors, { CorsOptions } from 'cors'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likeRoutes from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import './utils/s3'
import conversationsRouter from './routes/conversations.routes'
import { createServer } from 'http'
import initSocket from './utils/socket'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { envConfig, isProduction } from './constants/config'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
// import './utils/fake'

// c1: write swagger with comment in js file
// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Swagger Twitter Clone',
//       version: '1.0.0'
//     },
//     components: {
//       securitySchemes: {
//         BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
//       }
//     }
//   },
//   apis: ['./src/routes/*.routes.ts', './src/models/schemas/*.schema.ts']
// }

// c2: write swagger with comment in yaml files
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Twitter Clone',
      version: '1.0.0'
    }
  },
  apis: ['./swagger/*.yaml']
}

const openapiSpecification = swaggerJsdoc(options)

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
const app = express()

//limit request and rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// create server for socket
const httpServer = createServer(app)
initSocket(httpServer)
// Helmet helps secure Express apps
app.use(helmet())
const corsOptions = {
  origin: isProduction ? envConfig.clientUrl : '*'
}
app.use(cors(corsOptions))
const port = envConfig.port

// create swagger for project
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

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

httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
