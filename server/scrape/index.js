var username = process.env['UTILITIESKINGSTON_USERNAME']
var password = process.env['UTILITIESKINGSTON_PASSWORD']

var async = require('async')
var webscrape = require('utilitieskingston')(username, password)
var parse = require('csv').parse

var dailysums = require('./dailysums')

module.exports = scrape

// options
//   from (date) inclusive
//   to (date) inclusive
function scrape (accountId, options, cb) {
  async.waterfall([
    function (cb) {
      webscrape(accountId, options, cb)
    },

    function (csv, cb) {
      parse(csv, cb)
    },

    function (data, cb) {
      dailysums.batch(accountId, data, cb)
    },
  ], cb)
}
