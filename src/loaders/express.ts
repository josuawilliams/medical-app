import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routesMedical from '../routes/routes';
import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'

async function startExpress(): Promise<void> {
  const app = express()
  app.use(
    cors({
      credentials: true
    })
  )

  app.use(compression())
  app.use(cookieParser())
  app.use(bodyParser.json())
  routesMedical(app)

  const server = http.createServer(app)
  const port = process.env.PORT

  server.listen(port, () => {
    console.log('Server Running On http://localhost:4000/')
  })
}

export { startExpress }
