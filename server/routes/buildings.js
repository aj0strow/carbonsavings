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
    res.json({
      buildings: objects.map(partial),
      savings: 164200,
    })
  })
})

app.get('/building/:id', function (req, res, next) {
  var query = { id: req.params.id }
  mongodb.buildings.findOne(query, function (e, object) {
    if (e) { return next(e) }
    res.json(full(object))
  })
})

// helpers

function full (building) {
  var json = partial(building)
  merge(json, pick(building, 'name', 'description'))
    
  var location = building.location
  json.address = pick(location, 'streetName', 'streetNumber', 'city', 'country')
  merge(json.address, { postalCode: location.zipcode, province: location.state })

  var images = building.images
  json.imageThumbnail = images.small
  json.imageLarge = images.large

  return json
}

function partial (building) {
  var json = pick(building, 'id')
  json.coordinates = pick(building.location, 'latitude', 'longitude')
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
