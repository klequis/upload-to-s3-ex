import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import 'babel-polyfill'
import images from '../routes/image-route'

/* Dev */
import { yellow, redf } from '../logger'


const app = express()
const path = require('path')

const port = process.env.PORT


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/images', images)
app.get('/api', (req, res) => {
  redf('Invalid endpoint!')
  res.send('Invalid endpoint!')
})

if (!module.parent) {
  app.listen(3030, () => {
    console.log('Server is listening on port 3030')
  })
}

module.exports = { app, port }
