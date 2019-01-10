const conEdisonBills = require('../conEdisonBills')
const { computeSum, createSumObj } = require('../ledger-sum')
const assert = require('assert')

sum = computeSum(conEdisonBills)
const startTime = new Date(sum['startTime']).toLocaleString()
const endTime = new Date(sum['endTime']).toLocaleString()
const sumsMap = sum['sumsMap']
console.log(`Start Date ${startTime}`)
console.log(`End Date ${endTime}`)

assert.ok(startTime.startsWith("6/13/2018"))
assert.ok(endTime.startsWith("10/12/2018"))
assert.ok(sumsMap.has('USD'))
assert.ok(!sumsMap.has('ETH'))
assert.equal(sumsMap.get('USD'), "1548.99")

console.log(JSON.stringify(sum))

