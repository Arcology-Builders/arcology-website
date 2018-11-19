const { Range, List, Map } = require('immutable')
const { toDayNumber, getDayDiff, toDate } = require('./calendar')
const assert = require('assert')

function verify(oldGuestDaysList, newGuestDays) {
  oldGuestDaysList.map((l) => {
	  assert((newGuestDays.first.dayNum > l.last.dayNum) ||
                 (newGuestDays.last.dayNum > l.first.dayNum))
  })
}

module.exports = function(guestDaysMap, msg) {
  const content = msg.value.content
  if (content.subtype !== "booking") { return }
  //guestDaysMap = guestDaysMap ? guestDaysMap : new Map()
  const guestName = content.guestName
  const guestId = content.guestId
  const sdNum = toDayNumber(new Date(content.moveInDate))
  const edNum = toDayNumber(new Date(content.moveOutDate))
  const bedId = content.bedId
  // The range should stop the night before the moveOutDate
  const newGuestDays = new Range(sdNum,edNum).map((v) =>
    new Object({
      date: toDate(v),
      dayNum: v,
      guestId: guestId,
      guestName: guestName,
      bedId: bedId
    }))
  const oldGuestDays = guestDaysMap.get(guestId) || List([])
  //verify(oldGuestDays, newGuestDays)
  const updatedGuestDays = oldGuestDays.push(newGuestDays)
  return guestDaysMap.set(guestId, updatedGuestDays)
}

