import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: 'name', age: 25 })

const root = document.getElementById('root')

if (root) {
  const userFrom = new UserForm(root, user)

  userFrom.render()
} else {
  throw new Error('Root element not found')
}

