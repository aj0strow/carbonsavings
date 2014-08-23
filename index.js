var env = process.env['NODE_ENV']
if (env != 'production') {
  require('dotenv').load()
}

var port = process.env['PORT'] || 8000
var app = require('./server/app')

app.listen(port, function () {
  console.log('listening on %d', port)
})
