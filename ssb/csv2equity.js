fs = require('fs')
assert = require('assert')
const { createTxObj } = require('utils')

function usage() {
  console.log(`{process.argv[0]} FILENAME BASEACCOUNT [currency]`)
}

FILENAME = process.argv[1] || (usage(), process.exit(1))
BASE_ACCOUNT = process.argv[3] || (usage(), process.exit(1))
CURRENCY = process.argv[2] || 'USD'

console.log(`Reading file ${FILENAME}`)
console.log(`Currency ${CURRENCY}`)

text = fs.readFileSync(filename).toString()
lines = text.split("\n")

class Transaction {

  constructor(date, payeeShort, payeeLong, amount, type, category, account) {
    this.date = date
    this.payeeShort = payeeShort
    this.payeeLong = payeeLong
    this.amount = amount
    this.type = type
    this.category = category
    this.account = account
  }

  toEquityTxObj() {
    fromAccount = (this.type === 'debit') ? BASE_ACCOUNT : this.account
    toAccount = (this.type === 'credit') ? this.account : BASE_ACCOUNT
    return createTxObj({
      txDate: date.toLocaleString(),
      amountNumber: this.amount,
      amountCurrency: CURRENCY,
      payee: this.payeeShort,
      description: this.payeeLong,
      fromAccount: fromAccount,
      toAccount: toAccount,
      txDate: this.date,
    })
  }

  // Old ledger-cli, in case we ever have to use it in the future
  toLedgerString() {
    let year = this.date.getUTCFullYear()
    let month = this.date.getUTCMonth()+1 // 0 based
    let day = this.date.getUTCDay()+1 // 0 based
    return `${year}/${month}/${day} ${this.payeeShort}
        ${this.category}        ${this.amount}
        ${this.account} 
    `
  }
}

ACCOUNT_MATCH = {
  "s/

function predictAccount(payee) {
}

function becuLine2tx(line) {
  tokens = line.split(",")
  date = new Date(tokens[0])
  payeeShort = tokens[1]
  payeeLong = tokens[2]
  creditAmount = tokens[3]
  debitAmount = tokens[4]
  account = tokens[5] 
  description = tokens[6]
  return new Transaction(new Date(date), payeeShort, payeeLong, amount)
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

for (var i = lines.length - 1; i >= 0; i--) {
  console.log(line2tx(lines[i]).toLedgerString());
}
