import 'reflect-metadata'
import { MetadataKeys } from '../../ts/enum'

export const bodyValidator = (...keys: string[]) => {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key)
  }
}
