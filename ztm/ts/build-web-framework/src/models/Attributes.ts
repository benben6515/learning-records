export class Attributes<T> {
  constructor(private data: T) {}

  public get = <K extends keyof T>(propsName: K): T[K] => {
    return this.data[propsName]
  }

  public set(update: T): void {
    Object.assign(this.data, update)
  }

  public getAll(): T {
    return this.data
  }
}
