# Carbon Savings

API for the energy map project. 

### API

```
GET carbonsavings.herokuapp.com/buildings

{
  buildings: [ {building} ],
  savings: 50308
}
```

All origins allowed. The savings is the dollar amount of savings for the last five years. 

```
GET carbonsavings.herokuapp.com/building/:id

{
  id: "29-nelson-st",
  name: "29 Nelson Street",
  description: "6 Bedroom Non Meal Plan House which includes: 1 - Small, 2 - Medium (1 - Medium is a Fire Escape Room), 2 - Large, and 1 - Jumbo, 2 - Bathrooms, 1 - Kitchen.",
  imageThumnal: "http://www.studenthousingkingston.ca/default/cache/file/13B9F7F8-07F7-4768-A8817C6FE8B93633_small.jpg",
  imageLarge: "http://www.studenthousingkingston.ca/default/cache/file/13B9F7F8-07F7-4768-A8817C6FE8B93633_medium.jpg",
  address: {address},
  coordinates: {coords},
  savings: {
    fiveYear: 50308,
    lastMonth: 0.52
  }
}
```

### Environment

Put the following environment variables in a `.env` file.

* `MONGOLAB_URI` the mongodb url
* `UTILITIESKINGSTON_USERNAME` and `UTILITIESKINGSTON_PASSWORD` the email and password for the utilities kingston green button data portal. 

### Scraping

There are a few anomalies. 

* 309 University Ave does not have an account id. It was combined with 307, so each house should claim half the utility consumption of 307. 

* 374 Earl St and 376 have shared seed data on the kingston website. Each should use the combined 374376 page. 

To combat inconsist primary keys, the server always uses the dash-delimited abbreviated lowercase address.

```javascript
// Good
'374-earl-st'

// Bad
'374 EARL ST'
'373-Johnson-Street'
'10-aberdeen-street'
```

### Schema

#### buildings

```
_id (bson id)
id (string)
name (string)
images
  small (string : url)
  large (string : url)
description (string)
location
  latitude (float)
  longitude (float)
  country (string)
  countryCode (string)
  city (string)
  zipcode (string)
  streetName (string)
  streetNumber (string)
  state (string)
  stateCode (string)
accountIds (array : string)
pct (float)
```

#### dailysums

Node that `peak`, `midpeak`, and `offpeak` are in kWh. 

```
_id (bson id)
accountId (string)
date (string : YYYY-MM-DD)
peak (float)
midpeak (float)
offpeak (float)
```
