const { Map } = require('immutable')

// txs is a List of JSON objects, which represent
// the msg.content.value of a SSB message.
function computeSum(txs) {
  currencies = txs.reduce((sum, val, key) => {
    let txCurrency = val['amountCurrency'],
        txAmount = Number(val['amountNumber']);
        prevAmount = Math.max(sum.get(txCurrency, 0), 0);
    return sum.set(txCurrency, prevAmount + txAmount)
  }, new Map({}),
  )
  startDate = txs.reduce((sum, val, key) => {
	  return Math.min(val['txTime'], sum)
  }, Number.MAX_SAFE_INTEGER,
  )
  endDate = txs.reduce((sum, val, key) => {
	  return Math.max(val['txTime'], sum)
  }, 0,
  )
  return {
    currencies: currencies,
    startDate: startDate,
    endDate: endDate
  }
}

module.exports = computeSum
