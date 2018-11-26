const ssbClient = require('ssb-client')
const nacl = require('libsodium-wrappers')
const conEdisonBills = require('./conEdisonBills')
const { computeSum, createSumObj } = require('./ledger-sum')
const pull = require('pull-stream')
const { is, Set, Map, List } = require('immutable')

const a = (async() => {
  await nacl.ready;
})

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

a().then(function() {

  ssbClient(function (err, sbot) {
    if (err) throw err
    pull(
      sbot.createFeedStream(),
      pull.collect(function (err, msgs) {
        console.log(msgs.length);
        if (err) { console.log(err); return }
	const conEdisonSum = new List([computeSum(conEdisonBills)])
	publishUniques(msgs, (x)=>{return x.value.content.subtype==='sum'}, conEdisonSum, sbot);
	//publishUniques(msgs, (x)=>{return x.value.content.isBill}, conEdisonBills, sbot);
      })
    )
  })
});

function publish(params) {
  params['sbot'].publish(params['msg'])
}
