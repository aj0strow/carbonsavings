// dependencies

var express = require('express')
var morgan = require('morgan')

// exports

var app = express()
module.exports = app

// settings

app.disable('x-powered-by')
app.use(morgan('dev'))

// routes

app.use(require('./routes/buildings'))
