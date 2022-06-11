import { Model } from './Model'
import { Attributes } from './Attributes'
import { ApiSync } from './ApiSync'
import { Eventing } from './Eventing'
import { Collection } from './Collection'

const rootUrl = 'http://localhost:3000/users'

export interface UserProps {
  id?: number
  name?: string;
  age?: number
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    )
  }

  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json: UserProps) => User.buildUser(json)
    )
  }

  public setRandom(): void {
    const age =  Math.round(Math.random() * 100)
    this.set({ age })
  }
}
