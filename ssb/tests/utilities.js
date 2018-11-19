const { Map, Set } = require('immutable')
const assert = require('assert')

const billMsg = require('./bill-split-days').msg
const bookingMsg = require('./booking').msg

const billSplitDays = require('../bill-split-days')
const booking = require('../booking')

const billDays = billSplitDays([], billMsg)
const billDaysSet = new Set(billDays)
const guestDaysMap = booking(new Map({}), bookingMsg)

const guestDays = guestDaysMap.get(1234).get(0)
const guestDaysSet = new Set(guestDays)
assert.equal(30, billDays.count())
assert.equal(122, billDays.get(0).dayNum)
assert.equal(151, billDays.last().dayNum)
assert.equal(24, guestDays.count())
assert.equal(135, guestDays.get(0).dayNum)
assert.equal(158, guestDays.last().dayNum)

// Return an integer >= 0 that is the number of days that intersect between days1 and days2, which are Seq's
function intersect(days1, days2) {
  daysMin = days1.get(0).dayNum < days2.get(0).dayNum ? days1 : days2
  daysMax = days1.get(0).dayNum < days2.get(0).dayNum ? days2 : days1
  return Math.max(0, daysMin.last().dayNum - daysMax.first().dayNum + 1)
}
const bill1Guest1Days = intersect(billDays, guestDays)
assert.equal(17, bill1Guest1Days)

const amountUtilitiesOwed = billDays.get(0).billAmtPerDay * bill1Guest1Days
assert.ok(Math.abs(90.757 - amountUtilitiesOwed) < 0.001, `Expected 90.763 but was ${amountUtilitiesOwed}`)
console.log(`Total Amount Owed Bill 1 Guest 1 ${amountUtilitiesOwed}`)
