const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const plaid = require('plaid');

const config = require('../config')

const client = new plaid.Client(
  config.client_id,
  config.developmentSecret,
  config.public_key,
  plaid.environments.development
)

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', require('./api/routes/plaid'))

// Error handling
app.use((req, res, next) => {
  const error = new Error('Route not found')
  res.status(404)
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => {
  console.log('Server running on port:', port)
})