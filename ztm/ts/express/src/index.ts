import express, { Request, Response } from 'express'
import { router } from './routes/loginRoutes'
import cookieSession from 'cookie-session'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['session'] }))
app.use(router)

app.listen(3000, () => {
  console.log(`app listen on 3000`)
})

// class

class Server {
  app: express.Express = express()

  constructor() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieSession({ keys: ['benben'] }))
    this.app.use(router)
  }

  start() {
    this.app.listen(3000, () => {
      console.log(`app listen on 3000`)
    })
  }
}

new Server().start()