import express, { Request, Response } from 'express'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/LoginController'
import './controllers/RootController'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['session'] }))
app.use(AppRouter.getInstance())

app.get('/hi', (req: Request, res: Response) => {
  res.send('hi there')
})

app.listen(3000, () => {
  console.log(`app listen on 3000`)
})
