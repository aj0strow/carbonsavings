// dependencies

var express = require('express')
var morgan = require('morgan')
var cors = require('cors')

// exports

var app = express()
module.exports = app

// settings

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(cors())

// routes

app.use(require('./routes/buildings'))
