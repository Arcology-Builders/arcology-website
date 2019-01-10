const { Map } = require('immutable')
const { combineCurrencyMaps } = require('./ledger-sum')

function createSnapshotObj(params) {
  return {
    startTime: params['startTime'],
    endTime: params['endTime'],
    prevSnapshotSig: params['prevSnapshotSig'],
    nextSnapshotSig: params['nextSnapshotSig'],
    sumsMap: params['sumsMap'],
    type: 'ledger',
    subtype: 'snapshot',
  }
}

function combineSumObjs(sum1, sum2) {
  if (sum1 === null) return sum2
  if (sum2 === null) return sum1
  return new Map({
	  startTime: Math.min(sum1.startTime, sum2.startTime),
	  endTime: Math.max(sum1.endTime, sum2.endTime),
	  currencyMap: combineCurrencyMaps(List([sum1.currencyMap, sum2.currencyMap]))
}
// sums is a List of JSON objects, which represent
// the msg.content.value of a SSB message.
function computeSnapshot(sums) {
  sumsMap = sums.reduce((sum, val, key) => {
    let acctName = key;
    return combineSum(sum, val)
  })
  startTime = sums.reduce((sum, val, key) => {
    return Math.min(val['startTime'], sum)
  }, Number.MAX_SAFE_INTEGER,
  )
  endTime = sums.reduce((sum, val, key) => {
    return Math.max(val['endTime'], sum)
  }, 0,
  )

  return createSnapshotObj({
    sumsMap: sumsMap,
    startTime: startTime,
    endTime: endTime,
  })
}

module.exports = {
  computeSnapshot: computeSnapshot,
  createSumObj: createSumObj,
}
