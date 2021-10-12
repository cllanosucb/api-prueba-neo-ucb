const express = require('express') //llamamos a Express

var app = express()               

app.use(require('./neo'))

module.exports = app;