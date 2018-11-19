var booking = require("../booking")
const { Map } = require('immutable')

var msg = 
{ value:
  { content: 
   { type: 'ledger',
     amountNumber: 230.00,
     amountCurrency: 'USD',
     rentNumber: 100.00,
     cleaningNumber: 30.00,
     depositNumber: 100.00,
     guestName: 'Jonas Salk',
     guestId: 1234,
     bedId: '8L',
     fromAcct: 'Arcology:Income:Airbnb',
     toAcct: 'BECU Business Checking',
     txDate: '2018-05-10 EDT',
     moveInDate: '2018-05-15 EDT',
     moveOutDate: '2018-06-08 EDT',
     subtype: 'booking'
   } } }

var msg2 = 
{ value:
  { content: 
   { type: 'ledger',
     amountNumber: 122.00,
     amountCurrency: 'USD',
     rentNumber: 100.00,
     cleaningNumber: 30.00,
     depositNumber: 100.00,
     guestName: 'Doodad Ferguson',
     guestId: 4242,
     bedId: '5P',
     fromAcct: 'Arcology:Income:Airbnb',
     toAcct: 'BECU Business Checking',
     txDate: '2018-04-10 EDT',
     moveInDate: '2018-04-30 EDT',
     moveOutDate: '2018-05-12 EDT',
     subtype: 'booking'
   } } }

assert = require('assert')
var guestDaysMap = booking(new Map({}), msg)
assert.equal(guestDaysMap.count(), 1,
  `There should be one guest ${guestDaysMap.count()} `)
assert.equal(guestDaysMap.get(1234).count(), 1,
  `First guest should have 1 new booking, was ${guestDaysMap.count()} `)
assert.equal(guestDaysMap.get(1234).get(0).count(), 24,
  `First guests first booking should have 24 days, was ${guestDaysMap.get(1234).get(0).count()} `)
guestDaysMap = booking(guestDaysMap, msg2)
assert.equal(guestDaysMap.count(), 2,
  `Second guess makes two bookings, was ${guestDaysMap.count()} `)
/*
assert.equal(newDays.get(0).residentName, "Jonas Hall-Andersen")
assert.equal(newDays.get(0).date.getFullYear(), 2018)
assert.equal(newDays.get(0).date.getMonth(), 4)
assert.equal(newDays.get(0).date.getDate(), 15)
*/

module.exports = {
  msg: msg
}
