const express = require('express')
const app = express()

app.use(require('./empleador'))

module.exports = app