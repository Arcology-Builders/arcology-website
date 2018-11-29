const ssbClient = require('ssb-client')
const nacl = require('libsodium-wrappers')
const conEdisonBills = require('./conEdisonBills')
const { computeSum, createSumObj } = require('./ledger-sum')
const pull = require('pull-stream')
const { is, Set, Map, List } = require('immutable')
const { publishUniques } = require('./utils')

const a = (async() => {
  await nacl.ready;
})

a().then(function() {

  ssbClient(function (err, sbot) {
    if (err) throw err
    pull(
      sbot.createFeedStream(),
      pull.collect(function (err, msgs) {
        console.log(msgs.length);
        if (err) { console.log(err); return }
	const conEdisonSum = new List([computeSum(conEdisonBills)])
	publishUniques(msgs, (x)=>{return x.value.content.subtype==='sum'}, conEdisonSum, nacl, sbot);
	//publishUniques(msgs, (x)=>{return x.value.content.isBill}, conEdisonBills, sbot);
      })
    )
  })
});

