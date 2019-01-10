// BECU-specific CSV reader and converter
const { TransactionFromCSV } = require('./csv-tx')
const { List } = require('immutable')

// Only do bank-specific munging here.
// BECU numbers are already strings, we just need to strip the quotes
// All operations that can be done from standard ctor params should be done in
// TransactionFromCSV
function becuLine2TxObj(tokens, baseAccount, currency) {
  let creditAmount = Math.abs(Number(tokens[4])),
    debitAmount = Math.abs(Number(tokens[3])),
    amount = (creditAmount) ? creditAmount : debitAmount,
    payeeLong = tokens[2],
    type = (creditAmount) ? 'credit' : (debitAmount) ? 'debit' :
		(console.error(`Zero amount for line ${JSON.stringify(tokens)}`), null);
    
  const newTx = new TransactionFromCSV({
    date: new Date(tokens[0]),
    checkNumber: tokens[1],
    payeeLong: tokens[2],
    amount: String(amount),
    currency: currency,
    type: type,
    account: baseAccount,
    remoteAccount: tokens[5] || "", // optional
    description: tokens[6] || "", // optional
  })
  console.log(JSON.stringify(newTx));
  return newTx;
}

// Lines from BECU have a header line at the top
// and an empty line at the end.
// Each line should have a minimum of 5 tokens
function becuCsv2TxObj(filename, baseAccount, currency) {
  let text = fs.readFileSync(filename).toString(),
      lines = text.split("\n")
  return List(lines).map((x) => {
    return x.split(',').map((y)=>{return y.replace(/\"/g,'')})
  }).filter((x,i) => {
    return (x.length >= 5)
  }).skipWhile((x,i) => {
    return (i == 0)
  }).map((x) => {
    return becuLine2TxObj(x)
  })
}


class ReaderBECU {

  constructor(filename, baseAccount, currency) {
    this.filename = filename
    this.baseAccount = baseAccount
    this.currency = currency
  }

  toLedgerStrings() {
    return becuCsv2TxObj(this.filename, this.baseAccount, this.currency).map(
      (x) => {return x.toLedgerString()}
    )
  }

  toEquityTxObjs() {
    return becuCsv2TxObj(this.filename, this.baseAccount, this.currency).map(
      (x) => {return x.toEquityTxObj()}
    )
  }
}

module.exports = {
  ReaderBECU: ReaderBECU,
}
