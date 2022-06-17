import { View } from './View'
import { Model } from '../models/Model'
import { User, UserProps } from '../models/User'
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'mouseenter:h1': this.onHeaderHover,
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
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

  onSaveClick = ():void => {
    this.model.save()
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save Model</button>
      </div>
    `
  }
}