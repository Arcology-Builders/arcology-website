const { Map, List } = require('immutable')
const { createTxObj } = require('./ledger-tx')

function createBillObj(params) {
  return createTxObj({
    amountNumber: String(params['amountNumber']),
    amountCurrency: 'USD',
    payee: 'Con Edison',
    description: params['description'],
    fromAccount: 'Bank of America',
    toAccount: 'Arcology:Expenses:Electricity',
    txDate: params['txDate'],
    billEndDate: params['billEndDate'], 
    billStartDate: params['billStartDate'],
    billAccountNumber: params['billAccountNumber'],
    isBill: true,
  })
}

objArray = [
  createBillObj({
    amountNumber: 143.93,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-06-13 EDT',
    billStartDate: '2018-05-01 EDT',
    billEndDate: '2018-05-31-EDT',
  }),
  createBillObj({
    amountNumber: 86.64,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-07-13 EDT',
    billStartDate: '2018-05-31 EDT',
    billEndDate: '2018-06-29 EDT',
    billAccountNumber: '63 3080 0175 0701 0',
  }),
  createBillObj({
    amountNumber: 133.43,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-08-13 EDT',
    billStartDate: '2018-06-29 EDT',
    billEndDate: '2018-07-31-EDT',
    billAccountNumber: '63 3080 0175 0701 0',
  }),
  createBillObj({
    amountNumber: 109.44,
    description: "Electricity bill for Apt 4F",
    txDate: '2018-09-12 EDT',
    billStartDate: '2018-07-31 EDT',
    billEndDate: '2018-08-29-EDT',
    billAccountNumber: '63 3080 0175 0701 0',
  }),
  createBillObj({
    amountNumber: 160.04,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-06-13 EDT',
    billStartDate: '2018-05-01 EDT',
    billEndDate: '2018-05-31-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createBillObj({
    amountNumber: 168.44,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-07-13 EDT',
    billStartDate: '2018-05-31 EDT',
    billEndDate: '2018-06-29-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createBillObj({
    amountNumber: 276.67,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-08-13 EDT',
    billStartDate: '2018-06-29 EDT',
    billEndDate: '2018-07-31-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createBillObj({
    amountNumber: 239.04,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-09-12 EDT',
    billStartDate: '2018-07-31 EDT',
    billEndDate: '2018-08-29-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
  createBillObj({
    amountNumber: 231.36,
    description: "Electricity bill for Apt 4B",
    txDate: '2018-10-12 EDT',
    billStartDate: '2018-08-29 EDT',
    billEndDate: '2018-09-28-EDT',
    billAccountNumber: '63 3080 0175 0801 8',
  }),
]

module.exports = List(objArray)
