import { Request, Response, NextFunction } from 'express'
import { get, post, controller, use, bodyValidator } from './decorators'

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('request was made!')
  next()
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>login</button>
      <form>
    `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin (req: Request, res: Response) {
    const { email, password } = req.body
    if (email && password && email === "hi@hi.com" && password === "password") {
      console.log(email + password)
      req.session = { loggedIn: true }
      res.redirect("/")
    } else {
      res.send("Invalid email or password")
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null
    res.redirect("/")
  }

}
