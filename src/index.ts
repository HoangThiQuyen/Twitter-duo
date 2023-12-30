import express from 'express'
const app = express()
const router = express.Router()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

//middleware
router.use((req, res, next) => {
  console.log('Time', Date.now())
  next()
})

router.get('/tweets', (req, res) => {
  res.json({ data: [{ id: 1, text: 'hello world' }] })
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
