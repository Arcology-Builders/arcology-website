const { becuLine2tx, predictAccount } = require('../csv2equity')
const assert = require('assert')

line1 = '"10/10/2018","","ATM Withdrawal - MCU 374 STOCKHOLM ST.      BROOKLYN     NYUS - Card Ending In 8958","-50",""'
line2 = '"10/10/2018","","External Deposit - AIRBNB PAYMENTS  - 5UMXI3CGKP  RMR*IK*G-EWXMW6ZIXNWAA\","","0.73"'
line3 = '"10/4/2018","","POS Withdrawal - 720000556508 FOOD BAZAAR 1580 GATES RIDGEWOOD    NYUS - Card Ending In 8958","-28.32",""'

const tx1 = becuLine2tx(line1)
assert.equal(tx1.date, new Date("10/10/2018"))
assert.equal(tx1.payeeLong, "ATM Withdrawal - MCU 374 STOCKHOLM ST.      BROOKLYN     NYUS - Card Ending In 8958")
assert.equal(tx1.amount, -50)
