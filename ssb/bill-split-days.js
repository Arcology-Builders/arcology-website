const { Seq, Range } = require('immutable')
const { toDayNumber, getDayDiff, toDate } = require('./calendar')

module.exports = function(days, msg) {
  // Any other message type does not affect the days
  var content = msg.value.content
  if (content.subtype !== 'bill') { return days }
  var payee = content.payee
  var sd = new Date(content.billStartDate)
  var ed = new Date(content.billEndDate)
  var accountNum = content.billAccountNumber
  var txAmount = Number(content.amountNumber)
  // Calculate the number of days in this period
  var periodDays = getDayDiff(sd, ed)
  var amtPerDay = txAmount / periodDays
  console.log(txAmount);
  console.log(periodDays);
  console.log(amtPerDay);
  var sdNum = toDayNumber(sd);
  var edNum = toDayNumber(ed);
  var currentDayNum = sd;
  return Seq(days).concat(new Range(sdNum+1,edNum+1).map((v) => 
    new Object({ date: toDate(v), dayNum: v, billAmtPerDay: amtPerDay, payee: payee })
  ))
  //return Seq(days).concat(newDays)
}

