import { MatchReader } from './MatchReader'
import { MatchResult } from './MatchResult'
import { CsvFileReader } from './CsvFileReader'

const csvFileReader = new CsvFileReader('football.csv')

const matchReader = new MatchReader(csvFileReader);
matchReader.load()

let manUnitedWins = 0

for (let match of matchReader.matches) {
  if (match[1] === 'Man United' && match[5] === MatchResult.homeWin) {
    manUnitedWins++
  } else if (match[2] === 'Man United' && match[5] === MatchResult.awayWin) {
    manUnitedWins++
  }
}

console.log(manUnitedWins)
