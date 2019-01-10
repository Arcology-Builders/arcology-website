fs = require('fs')
assert = require('assert')
const { ReaderBECU } = require('./csv-tx-becu')
const { List, OrderedMap } = require('immutable')

function usage() {
  console.log(`${process.argv[0]} ${process.argv[1]} filename baseAccount [currencySymbol]`)
}

FILENAME = process.argv[2] || (usage(), process.exit(1))
BASE_ACCOUNT = process.argv[3] || (usage(), process.exit(1))
CURRENCY = process.argv[4] || 'USD'

console.log(`Reading file ${FILENAME}`)
console.log(`Currency ${CURRENCY}`)

const reader = new ReaderBECU(FILENAME, BASE_ACCOUNT, CURRENCY)
reader.toLedgerStrings().forEach((x) => console.log(x))
//reader.toEquityTxObjs().forEach((x) => console.log(JSON.stringify(x)))
