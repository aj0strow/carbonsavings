var mongojs = require('mongojs')

var db = mongojs(process.env['MONGOLAB_URI'], [
  'buildings',
  'dailysums',
])

db.dailysums.ensureIndex({
  accountId: 1, date: 1
}, {
  unique: true, dropDups: true
})

module.exports = db
