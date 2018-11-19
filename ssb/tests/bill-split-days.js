var billSplitDays = require("../bill-split-days")

var msg = 
{ value:
  { content: 
   { type: 'ledger',
     amountNumber: 160.16,
     amountCurrency: 'USD',
     payee: 'Con Edison',
     description: 'Electricity bill',
     fromAcct: 'Bank of America',
     toAcct: 'Arcology:Expenses:Electricity',
     txDate: '2018-06-13 EDT',
     startDate: '2018-05-01 EDT',
     billEndDate: '2018-05-31 EDT',
     billStartDate: '2018-05-01 EDT',
     billAccountNumber: '63 3080 0175 0801 8',
     subtype: 'bill'
   } } }

assert = require('assert')
var newDays = billSplitDays([], msg)

assert.equal(newDays.count(), 30,
  `New days should have length one less than period, was ${newDays.count()} `)
assert.equal(newDays.get(0).date.getFullYear(), 2018)
assert.equal(newDays.get(0).date.getMonth(), 4)
assert.equal(newDays.get(0).date.getDate(), 2)
roundedSplitAmount = Math.round(newDays.get(0).billAmtPerDay*1000)/1000
assert.equal(5.339, roundedSplitAmount)

module.exports = {
  msg: msg
}
