var pull = require('pull-stream')
var ssbClient = require('ssb-client')
var ssbKeys = require('ssb-keys')
var config = require('ssb-config')
//var config = require('ssb-config/inject')('arc2')

// configuration:
var keys = ssbKeys.loadOrCreateSync('./app-private.key')
var fs = require('fs')
var path = require('path')
var manifestFile = path.join(path.parse(config.config).dir, "manifest.json")

var manifest = JSON.parse(fs.readFileSync(manifestFile))
ssbClient(
/*
  keys,                // optional, defaults to ~/.ssb/secret
  {
    host: 'localhost', // optional, defaults to localhost
    port: config.port,        // optional, defaults to 8008
    key: keys.id,       // optional, defaults to keys.id
    ws: config.ws,
    caps: config.caps,
    manifest: manifest,
  },
  */
  function (err, sbot) {
    if (err) throw err
    pull(
      sbot.createFeedStream(),
      pull.collect(function (err, msgs) {
	if (err) { console.log(err); return }
        console.log(msgs.length);
	      /*
        for (var i; i < msgs.length; i++) {
          console.log(msgs[i].value);
        }*/
      })
    )
})
