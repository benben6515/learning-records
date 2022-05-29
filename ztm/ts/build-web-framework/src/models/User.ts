import { Eventing } from './Eventing'

interface UserProps {
  id?: number
  name?: string;
  age?: number
}

export class User {
  public events: Eventing = new Eventing()

  constructor(private data: UserProps) {}

  get(propsName: string): number | string {
    return this.data[propsName]
  }

  set(update: UserProps): void {
    Object.assign(this.data, update)
  }
}
