# Carbon Savings

The API for the energy map project. 

### Environment

Put the following environment variables in a `.env` file.

* `MONGOLAB_URI` the mongodb url
* `TEMPODB_KEY` and `TEMPODB_SECRET` the keys for the tempodb api. 
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
