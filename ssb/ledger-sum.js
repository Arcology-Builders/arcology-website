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
    type: 'ledger',
    subtype: 'sum',
  }
}

function combineCurrencyMaps( currencyMaps, precisionMap = PRECISION_MAP ) {
  return currencyMaps.reduce((sum, val, key) => {
    return val.reduce((sum1, val1, key1) => {
      let txCurrency = key1,
        txAmount = Number(val1),
	precisionPow = Math.pow(10, precisionMap.get(txCurrency)),
        prevAmount = Math.max(sum1.get(txCurrency, 0), 0),
	newSum = Math.round((prevAmount + txAmount)*precisionPow)/precisionPow;
      console.log(`Key: ${txCurrency} Val ${txAmount}`);
      return sum1.set(txCurrency, newSum)
    }, sum)
  }
  )
}

// txs is a List of JSON objects, which represent
// the msg.content.value of a SSB message.
function computeSum(txs) {
  let currencyMaps = txs.map((x) => {
    let key = x['amountCurrency'],
        val = x['amountNumber'];
    return new Map().set(key, val)}) 
  console.log(JSON.stringify(currencyMaps))
  sumsMap = combineCurrencyMaps(currencyMaps)
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

  return createSumObj({
    sumsMap: sumsMap,
    startTime: startDate,
    endTime: endDate,
    fromAccount: commonAccount('fromAccount'),
    toAccount: commonAccount('toAccount'),
  })
}

module.exports = {
  computeSum: computeSum,
  createSumObj: createSumObj,
  combineCurrencyMaps: combineCurrencyMaps,
}
