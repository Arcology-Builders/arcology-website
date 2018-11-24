const { Map, List } = require('immutable')

function createObj(params) {
  return {
    type: 'ledger',
    amountNumber: String(params['amountNumber']),
    amountCurrency: 'USD',
    payee: 'Con Edison',
    description: params['description'],
    fromAcct: 'Bank of America',
    toAcct: 'Arcology:Expenses:Electricity',
    txDate: params['txDate'],
    txTime: new Date(params['txDate']).getTime(),
    billEndDate: params['billEndDate'], 
    billStartDate: params['billStartDate'],
    billAccountNumber: params['billAccountNumber'],
    subtype: 'bill'
  }
}

objArray = [
  createObj({
    amountNumber: 143.93,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-06-13 EDT',
    billStartDate: '2018-05-01 EDT',
    billEndDate: '2018-05-31-EDT',
  }),
  createObj({
    amountNumber: 86.64,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-07-13 EDT',
    billStartDate: '2018-05-31 EDT',
    billEndDate: '2018-06-29 EDT',
    billAccountNumber: '63 3080 0175 0701 0',
  }),
  createObj({
    amountNumber: 133.43,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-08-13 EDT',
    billStartDate: '2018-06-29 EDT',
    billEndDate: '2018-07-31-EDT',
    billAccountNumber: '63 3080 0175 0701 0',
  }),
  createObj({
    amountNumber: 109.44,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-09-12 EDT',
    billStartDate: '2018-07-31 EDT',
    billEndDate: '2018-08-29-EDT',
    billAccountNumber: '63 3080 0175 0701 0',
  }),
  createObj({
    amountNumber: 160.04,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-06-13 EDT',
    billStartDate: '2018-05-01 EDT',
    billEndDate: '2018-05-31-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createObj({
    amountNumber: 168.44,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-07-13 EDT',
    billStartDate: '2018-05-31 EDT',
    billEndDate: '2018-06-29-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createObj({
    amountNumber: 276.67,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-08-13 EDT',
    billStartDate: '2018-06-29 EDT',
    billEndDate: '2018-07-31-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createObj({
    amountNumber: 239.04,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-09-12 EDT',
    billStartDate: '2018-07-31 EDT',
    billEndDate: '2018-08-29-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createObj({
    amountNumber: 231.36,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-10-12 EDT',
    billStartDate: '2018-08-29 EDT',
    billEndDate: '2018-09-28-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
]

module.exports = List(objArray)
