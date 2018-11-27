fs = require('fs')
assert = require('assert')
const { createTxObj } = require('./ledger-tx')
const { List, OrderedMap } = require('immutable')

function usage() {
  console.log(`${process.argv[0]} ${process.argv[1]} filename baseAccount [currencySymbol]`)
}

FILENAME = process.argv[2] || (usage(), process.exit(1))
BASE_ACCOUNT = process.argv[3] || (usage(), process.exit(1))
CURRENCY = process.argv[4] || 'USD'

console.log(`Reading file ${FILENAME}`)
console.log(`Currency ${CURRENCY}`)

text = fs.readFileSync(FILENAME).toString()
lines = text.split("\n")

// A standard Transaction from a CSV file
// All bank-specific handling should be in the helper function that calls thie constructor
// date is the clearing date of a transaction as a JS Date
//   (we don't currently support a separate posting date)
// payeeLong
// amount - a positive number represented as a String
// type - a String which is one of { 'credit', 'debit' }
// account is the ledger-style base account as a colon-delimited string
class TransactionFromCSV {

  constructor(params) {
    this.date = params['date']
    this.payeeLong = params['payeeLong']
    this.amount = params['amount'] 
    this.type = params['type']
    assert.ok(this.type === 'debit' || this.type === 'credit')
    this.fromAccount = params['fromAccount']
    this.toAccount = params['toAccount']
    const predictedAccount = predictAccount(params)
    this.fromAccount = (this.type === 'credit') ? predictedAccount : BASE_ACCOUNT
    this.toAccount = (this.type === 'debit') ? predictedAccount : BASE_ACCOUNT
  }

  toEquityTxObj() {
    return createTxObj({
      txDate: this.date.toLocaleString(),
      amountNumber: this.amount,
      amountCurrency: CURRENCY,
      payee: this.payeeLong,
      description: this.description,
      fromAccount: (type === 'debit') ? BASE_ACCOUNT : this.account,
      toAccount: (type === 'credit') ? BASE_ACCOUNT : this.account,
    })
  }

  // Old ledger-cli, in case we ever have to use it in the future
  toLedgerString() {
    let year = this.date.getUTCFullYear()
    let month = this.date.getUTCMonth()+1 // 0 based
    let day = this.date.getUTCDay()+1 // 0 based
    return `${year}/${month}/${day} ${this.payeeLong}
        ${this.toAccount}        ${this.amount} ${CURRENCY}
        ${this.fromAccount} 
    `
  }
}

ACCOUNT_CRITERIA = new List([
  ['Arcology:Income:Airbnb',
    new OrderedMap({ // we actually don't need this to be ordered, just reducible
      'payeeLong': /AIRBNB/,
      'type'     : 'credit',
    })
  ],
  ['Arcology:Expenses:Phone',
    new OrderedMap({
      'payeeLong': /SIMPLEMOBILE/,
      'type'     : 'debit',
    })
  ],
  ['Arcology:Expenses:Groceries',
    new OrderedMap({
      'payeeLong': /KEY FOOD/,
      'type'     : 'debit',
    })
  ],
  ['Arcology:Expenses:Groceries',
    new OrderedMap({
      'payeeLong': /FOOD BAZA/,
      'type'     : 'debit',
    })
  ],
  ['Arcology:Expenses:Electricity',
    new OrderedMap({
      'payeeLong': /CON ED/,
      'type'     : 'debit',
    })
  ],
  ['Arcology:Expenses:Supplies',
     new OrderedMap({
      'payeeLong': /NEW DOLLAR/,
      'type'     : 'debit',
     })
  ],
  ['Arcology:Expenses:Supplies',
     new OrderedMap({
      'payeeLong': /DALAL 99/,
      'type'     : 'debit',
     })
  ],
  ['Arcology:Expenses:Rent',
     new OrderedMap({
      'payeeLong': /Check/,
      'type'     : 'debit',
     })
  ],
  ['Arcology:Expenses:Fees',
     new OrderedMap({
      'payeeLong': /Check/,
      'amount'     : '2',
     })
  ],
])

// We predict the given source/destination acct based only on standard params
// given to constructor of TransactionFromCSV
function predictAccount(ctorParams) {
  // Find the first (highest-priority) entry that matches to predict the account
  // for this transaction
  const found = ACCOUNT_CRITERIA.find(
    (criteria) => {
      return criteria[1].reduce((sum, val, key) => {
        return (sum && ctorParams[key].match(val))
      }, true)
    })
  return (found) ? found[0] : "Imbalance"
}

// Only do bank-specific munging here.
// BECU numbers are already strings, we just need to strip the quotes
// All operations that can be done from standard ctor params should be done in
// TransactionFromCSV
function becuLine2tx(tokens) {
  let creditAmount = Math.abs(Number(tokens[4])),
    debitAmount = Math.abs(Number(tokens[3])),
    amount = (creditAmount) ? creditAmount : debitAmount,
    payeeLong = tokens[2],
    type = (creditAmount) ? 'credit' : (debitAmount) ? 'debit' :
		(console.error(`Zero amount for line ${JSON.stringify(tokens)}`), null);
    
  return new TransactionFromCSV({
    date: new Date(tokens[0]),
    checkNumber: tokens[1],
    payeeLong: tokens[2],
    amount: String(amount),
    type: type,
    account: BASE_ACCOUNT,
    remoteAccount: tokens[5], // optional
    description: tokens[6], // optional
  })
}

function line2tx(line) {
  tokens = line.split(",")
  date = new Date(tokens[0])
  payeeShort = tokens[1]
  payeeLong = tokens[2]
  amount = tokens[3]
  type = tokens[4]
  category = tokens[5] 
  account = tokens[6]
  return new Transaction(new Date(date), payeeShort, payeeLong, amount, type, category, account)
}

// Lines from BECU have a header line at the top
// and an empty line at the end.
// Each line should have a minimum of 5 tokens
function becuLines(lines) {
  const ledgerLines = List(lines).map((x) => {
    return x.split(',').map((y)=>{return y.replace(/\"/g,'')})
  }).filter((x,i) => {
    return (x.length >= 5)
  }).skipWhile((x,i) => {
    return (i == 0)
  }).forEach((x) => {
    console.log(becuLine2tx(x).toLedgerString())
  })
  //console.log(ledgerLines)
}

becuLines(lines)
