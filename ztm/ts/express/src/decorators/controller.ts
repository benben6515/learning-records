import 'reflect-metadata'
import { Router } from 'express'
import { Methods } from '../ts/enum'

export const router = Router()

export function controller (routePrefix: string) {
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key]
      const path = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)

      if (path) {
        router[method](`${routePrefix}${path}`)
      }
    }
  }
}
