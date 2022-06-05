import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: 'name', age: 25 })

const userFrom = new UserForm(document.getElementById('root'), user)

userFrom.render()
