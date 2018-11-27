Equity: a financial ledger on SSB for digital cooperatives
==========================================================

Equity is a financial ledger system, more similar to the ledger CLI tool
than GnuCash or Quicken. It defines a scheme of data objects
(transactions, sums, snapshots) that are stored on Secure Scuttlebutt
to provide distributed persistence, limited immutability and privacy,
and an API for computing useful statistics from yoru spending.

It was originally developed for Arcology, a sustainable community home,
to keep track of finances, distribute dividends, and allow people to
invest in a cooperative in exchange for equity, which is where its
name comes from. Although it is crypto-friendly (like ledger-cli it
easily handles any currency including crypto-coins like ETH and BTC),
it is designed to accept input from fiat currencies, offline
or cash transactions, and conventional
banks that export transactions in CSV format.

By itself, Equity is designed only to provide information about the
equity distribution of a co-operative for display, and will contain
some placeholder web and CLI user interfaces. It will eventually
incorporate ideas about mutual credit that are being developed on ssb,
as Equity can track a co-operative issuing an IOU.

For a complementary system that enables voting and decision-making based
on Equity's information, see Democracy built on Ethereum.
[http://github.com/invisible-college/democracy]

This is a preliminary version of the system and will undergo heavy revision
before it can be released and generally useful to other cooperatives.

# Properties

Equity is designed to have the following properties for a transparent
cooperative or a democracy, anything as small as a household to as large
as a company.
 
* Persistent - easy to maintain up-to-date backups. Unlike `ledger` or `hledger`,
we don't ask you to rely on external syncing for one large text file. However,
you must run Equity on a number of geographically separated machines for security
against natural disasters, and every stakeholder in a cooperative should run their
own Equity / SSB node to capture an archive of all past transactions, sums, and snapshots,
to prevent bad actors from double-spending, undoing, or otherwise falsifying records.

* Private - Equity uses SSB alternets to insulate your information from the SSB mainnet.
You can restrict sharing of your information by only giving the `shs` and port number to
stakeholders and other invited parties. Right now the messages are still sent in plaintext,
so with packet sniffing on open networks, other parties can 

* Fun - this is my first major project with SSB, and it's been great learning the protocol
and a functional-style of programming with immutable data. Taxes, budgeting, and group
decision-making have a bad rap with most people. My goal with Equity is to make it
easy to perform and maintain these important tasks, visualize your spending.

* Reproducible - Equity supports de-duping so that repeated entry attempts of dataa
(from CSV for example) are idempotent and are not likely to produce new SSB messages.
The recommended mode of using Equity is to (always) save your banking data,
and use the provided utility scripts to enter them so that you are always able to
rebuild a reproducible Equity ledger from scratch (in terms of final ending balances
and equity shares, modulo the timestamps / identities / signatures of the SSB messages).

* Versionable - unlike `hledger` or Google Spreadsheets, you can track every change to
your financial ledger and if necessary appending / rolling forward fixes, at the
finest level (per-transaction).

* Forkable - Using reproducibility, you can manually fork finances.

* Programmable - anyone who can program in Node JS can use the example scripts and
UIs to extend Equity.

# Concepts

* Transaction - the most granular object in the Equity ledger. Represents a transfer of
value from one account to another account, denominated in some currency, with an optional
description.

* Entry Line - usually from a CSV file, the same information as a transaction that can
either be converted to an Equity Transaction, a Ledger String, or some other format
(e.g. OFX or a Google Spreadsheet line). Equity allows you to write rules for account
prediction and other smart transformations early on in the pipeline.

* Account - a collection of transaction endpoints with a current balance. Following the
convention of `ledger` and `GnuCash`, accounts exist in a hierarchy where parent accounts
contain the sum of their own transactions and the balances of their child accounts. Each

* Sum - a collection of transaction endpoints, across one or more accounts.

* Snapshot - a collection of Sum's, representing a complete transaction history for
the Accounts touched by them.

# Workflow

The normal workflow for Equity proceeds as

* Any party can publish Transactions, either individually (e.g. from a mobile app while
on the go, or from a sane real-time banking API)
* Any party can see the Transactions, collect them into Sums, and publish that.
* Other parties can vote their support for the Sums by sending a vote.
* Any party can see the Sums, collect them into two kinds of snapshots, and publish that.
  * Snapshot of the First Kind: a standalone snapshot that doesn't build on any other snapshot.
    This is the first kind you create if you can't find any others, or it's an irreconciliable
    mess and you want to start from scratch. Only works with an external checkpoint like a
    bank statement.
  * Snapshot of the Second Kind: appends onto an existing snapshot, bringing its endingBalanceMap    into the future, or prepends onto an existing snapshot, bringing its startingBalanceMap into
    the past. In both cases, you are representing a comprehensive snapshot, usually
    corresponding to a bank statement, screenshot on venmo, or agreement from a house meeting.
* Any part can vote their support to snapshots.
* A UI (either on the web or CLI) accepts the latest snapshot it can find and displays
  the endingBalance of it, which is a currrency map.

# Future Extensions

* Price Oracle - independently of Equity, but using the same tools (perhaps on an alternet), for assets like stocks or cryptocurrencies, we can define new Equity
message types that collect historical price data and  present a feed that other tools can
use to calculate a portfolio's value over time, or profits and losses from trading.

* Security - for absolute privacy, you should run Equity / SSB over a VPN, and a library
like libsodium to encrypt messages similar to Patchwork.

* Migrate to git-ssb - No servers no masters. Equity and SSB are already distributed,
it doesn't make sense to rely on a centralized version control system either.
 

# Development Operations

## Building a Docker image

For easier testing with our canonical alternet, we've provided a Docker image built
by the `docker/Dockerfile` file and uploaded to Docker Hub with the name
`cryptogoth:arc-ssb-test`.

## Starting a new alternet

Right now the provided Docker images for Equity use an alternet with a shared secret
`shs` provided in the `docker/.arc` subdirectory. It runs on port 8007 for UDP/TCP
peer discovery and 8988 for websocket.

However, alternets can get filled with test data and outdated schemas.
(This problem happens with every distributed queue system such as Apache Kafka and
Google PubSub as well). While solving the schema problem is a problem for another time,
we can regularly ask all stakeholders to switch to a new alternet, repopulate the ledger
from a clean slate, verify that the fork is clean, and if necessary, trash the old
alternet.

(This should be a rare occurrence after development has stabilized, e.g. when
cooperatives fork).


## Importing from CSV

Your bank will probably let you export your data via a CSV file.
Arcology's business bank account uses BECU (Boeing Employee Credit Union),
such as appears 
so we provide a number of utilities to help 
```
node scratch-becu-csv.js local-box-business-checking-2018_10_01-2018_10_31.csv "BECU:Local Box Business" USD
```

