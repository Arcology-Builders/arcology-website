const { List, Set, Map } = require('immutable')

function publishUniques(allMsgs, filterFunc, enterMsgs, sbot) {
  const enterPairs = Map(enterMsgs.map((x) => List([List(nacl.crypto_hash(JSON.stringify(x))), x])) )
  const enterHashes = Set(enterPairs.keySeq())
  const existMsgs = List(allMsgs).filter(filterFunc)
  const existValues = existMsgs.map((x) => x.value.content)
  const existPairs = Map(existValues.map((x) => List([List(nacl.crypto_hash(JSON.stringify(x))), x])) )
  const existKeySet = Set(existPairs.keySeq())
  const enterUniques = enterHashes.subtract(existKeySet)
  enterUniques.forEach((h) => {
    const m = enterPairs.get(h)
    console.log(`Message ${JSON.stringify(m)} not found by hash, publishing`)
    publish({sbot: sbot, msg: m}, function (err, data) {
      console.error(err); console.log(data)
    })
  })
}

module.exports = {
  publishUniques: publishUniques
}
