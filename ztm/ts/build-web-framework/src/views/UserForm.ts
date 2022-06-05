import { User } from '../models/User'

export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'mouseenter:h1': this.onHeaderHover,
      'click:.set-age': this.onSetAgeClick
    }
  }

  onButtonClick(): void {
    console.log('Hi there')
  }

  onHeaderHover(): void {
    console.log('hover')
  }

  onSetAgeClick(): void {
    console.log('set age click')
    // TODO
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':')

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  template(): string {
    return `
      <div>
        <h1>User From</h1>
        <div>User name: ${this.model.get('name')}<div>
        <div>User age: ${this.model.get('age')}<div>
        <input />
        <button>Click</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `
  }

  render(): void {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
  }
}