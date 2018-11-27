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
  console.log(JSON.stringify(params))
  TX_PARAMS.forEach((x) => { assert.ok(x in newObj, ` Key ${x} not found`) })

  return new Map({
    type: 'ledger',
    txTime: new Date(params['txDate']).getTime(),
    subtype: 'tx',
  }).merge(newObj).toObject()
}

module.exports = {
  createTxObj: createTxObj
}
