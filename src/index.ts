import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/medias.routes'
import { initFolder } from './utils/file'

databaseService.connect()
const app = express()
const port = 4000

//create upload folder
initFolder()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediaRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
