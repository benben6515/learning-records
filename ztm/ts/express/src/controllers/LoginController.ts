import { Router, Request, Response, NextFunction } from 'express'
import { get } from '../decorators/routes'

@controller('/')
class LoginController {
  @get('/login')
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
}
