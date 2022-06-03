import { Collection } from './models/Collection'

const collection = new Collection('https://localhost:3000/user')

collection.on('change', () => {
  console.log(collection)
})

collection.fetch()
