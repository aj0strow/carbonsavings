// dependencies

var express = require('express')
var pick = require('lodash').pick
var merge = require('lodash').merge

// libs

var mongodb = require('../mongodb')

// exports

var app = express.Router()
module.exports = app

// module

app.get('/buildings', function (req, res, next) {
  mongodb.buildings.find(function (e, objects) {
    if (e) { return next(e) }
    res.json(objects.map(present))
  })
})

app.get('/building/:id', function (req, res, next) {
  var query = { id: req.params.id }
  mongodb.buildings.findOne(query, function (e, object) {
    if (e) { return next(e) }
    res.json(present(object))
  })
})

// helpers

function present (building) {
  var loc = building.location

  var json = pick(building, 'id', 'name', 'description', 'url')
  json.coordinates = pick(loc, 'latitude', 'longitude')

  // Oh Cananda, our home and native land ..
  json.address = merge({
    postalCode: loc.zipcode,
    province: loc.state,
  }, pick(loc, 'streetName', 'streetNumber', 'city', 'country'))

  json.imageThumbnail = building.images.small
  json.imageLarge = building.images.large

  var pct = 

  json.savings = {
    fiveYear: 164200,
    lastMonth: round(building.pct),
  }

  return json
}

function round (number) {
  if (!number) { return 0 }
  return +number.toFixed(2)
}
