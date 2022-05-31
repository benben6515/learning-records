type Callback = () => void

export class Eventing {
  private events: { [key: string]: Callback[] } = {}

  public on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  public trigger(eventName: string): void {
    const handlers = this.events[eventName]
    if (!handlers || handlers.length === 0) return
    handlers.forEach(callback => callback())
  }
}
