import fs from 'fs'

console.log('1')

const res = fs.readFileSync('./test.txt')
console.log('file:', res.toString())

console.log('2')
