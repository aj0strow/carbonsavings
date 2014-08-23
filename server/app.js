var express = require('express')
var morgan = require('morgan')

var app = express()

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(express.static(__dirname + '/../app'))

app.get('/buildings', require('./routes/buildings'))

module.exports = app
