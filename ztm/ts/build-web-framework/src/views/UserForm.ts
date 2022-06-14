import { View } from './View'
import { Model } from '../models/Model'
import { User, UserProps } from '../models/User'
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'mouseenter:h1': this.onHeaderHover,
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    }
  }

  onButtonClick(): void {
    console.log('Hi there')
  }

  onHeaderHover(): void {
    console.log('hover')
  }

  onSetAgeClick = (): void => {
    this.model.setRandom()
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value
      this.model.set({ name })
    }
  }

  template(): string {
    return `
      <div>
        <h1>User From</h1>
        <div>User name: ${this.model.get('name')}<div>
        <div>User age: ${this.model.get('age')}<div>
        <input />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `
  }
}