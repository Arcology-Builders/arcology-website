const conEdisonBills = require('../conEdisonBills')
const assert = require('assert')

assert.equal(conEdisonBills.count(), 9)

const firstBill = conEdisonBills.get(0)

assert.ok(firstBill.get('amountNumber'))
assert.ok(firstBill.get('amountCurrency'))
assert.ok(firstBill.get('payee'))
assert.ok(firstBill.get('description'))
assert.ok(firstBill.get('fromAccount'))
assert.ok(firstBill.get('toAccount'))
assert.ok(firstBill.get('txDate'))
assert.ok(firstBill.get('txTime'))
assert.equal(firstBill.get('type'), 'ledger')
assert.equal(firstBill.get('subtype'), 'tx')

console.log(JSON.stringify(firstBill))

