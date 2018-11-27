// These are params that are copied over directly by keyname
const { List, Map } = require('immutable')
const assert = require('assert')

TX_PARAMS = List([
  'amountNumber',
  'amountCurrency',
  'payee',
  'description',
  'fromAccount',
  'toAccount',
  'txDate', 
])

function createTxObj(params) {
  newObj = params
  TX_PARAMS.forEach((x) => { assert.ok(newObj[x]) })

  return new Map({
    type: 'ledger',
    txTime: new Date(params['txDate']).getTime(),
    subtype: 'tx',
  }).merge(newObj).toObject()
}

module.exports = {
  createTxObj: createTxObj
}
