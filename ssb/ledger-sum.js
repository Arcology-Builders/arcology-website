const { Map } = require('immutable')

const PRECISION_MAP = new Map({
	'USD': 2,
	'ETH': 18,
	'DAI': 18,
})


function createSumObj(params) {
  return {
    startTime: params['startTime'],
    endTime: params['endTime'],
    fromAccount: params['fromAccount'],
    toAccount: params['toAccount'],
    sumsMap: params['sumsMap'],
  }
}

// txs is a List of JSON objects, which represent
// the msg.content.value of a SSB message.
function computeSum(txs, precisionMap = PRECISION_MAP) {
  sumsMap = txs.reduce((sum, val, key) => {
    let txCurrency = val['amountCurrency'],
        txAmount = Number(val['amountNumber']),
	precisionPow = Math.pow(10, precisionMap.get(txCurrency)),
        prevAmount = Math.max(sum.get(txCurrency, 0), 0),
	newSum = Math.round((prevAmount + txAmount)*precisionPow)/precisionPow;
    return sum.set(txCurrency, newSum)
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

  function commonAccount(keyName) {
    return txs.reduce((sum, val, key) => {
      let commonAccount = (val[keyName] === sum || sum === "") ? val[keyName] : "";
      return commonAccount
    }, "",
  )}

  return {
    sumsMap: sumsMap,
    startTime: startDate,
    endTime: endDate,
    fromAccount: commonAccount('fromAccount'),
    toAccount: commonAccount('toAccount'),
  }
}

module.exports = {
  computeSum: computeSum,
  createSumObj: createSumObj,
}
