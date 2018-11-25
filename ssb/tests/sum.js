const conEdisonBills = require('../conEdisonBills')
const ledgerSum = require('../ledger-sum')

sum = ledgerSum(conEdisonBills)
console.log(`Start Date ${new Date(sum['startDate']).toLocaleString()}`)
console.log(`End Date ${new Date(sum['endDate']).toLocaleString()}`)

console.log(JSON.stringify(sum))

