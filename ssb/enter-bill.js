const ssbClient = require('ssb-client')
const nacl = require('libsodium-wrappers')
const conEdisonBills = require('./conEdisonBills')
const pull = require('pull-stream')
const { is, Set, Map, List } = require('immutable')

const a = (async() => {
  await nacl.ready;
})

function arrayEqual(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false
  }
  return true;
}

a().then(function() {
  const enterPairs = Map(conEdisonBills.map((x) => List([List(nacl.crypto_hash(JSON.stringify(x))), x])) )
  const enterHashes = Set(enterPairs.keySeq())

  ssbClient(function (err, sbot) {
    if (err) throw err
    pull(
      sbot.createFeedStream(),
      pull.collect(function (err, msgs) {
        console.log(msgs.length);
        if (err) { console.log(err); return }
	const existBills = List(msgs.filter((x) => x.value.content.subtype === "bill"))
	const existBillsValues = existBills.map((x) => x.value.content)
  	const existPairs = Map(existBillsValues.map((x) => List([List(nacl.crypto_hash(JSON.stringify(x))), x])) )
	const existKeySet = Set(existPairs.keySeq())
	const enterUniques = enterHashes.subtract(existKeySet)
	enterUniques.forEach((h) => {
	  const m = enterPairs.get(h)
          console.log(`Bill ${m} not found by hash, publishing`)
          publish({sbot: sbot, msg: m}, function (err, data) {
	    console.error(err); console.log(data)
	  })
        })
      })
    )
  })
});

function publish(params) {
  params['sbot'].publish(params['msg'])
}
