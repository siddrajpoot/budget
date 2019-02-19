const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('errorhandler')

const config = require('../config')

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

// Initiate our app
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'passport', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}))

if (!isProduction) {
  app.use(errorHandler())
}

mongoose.connect(`mongodb://${config.dbuser}:${config.dbpassword}@ds341825.mlab.com:41825/budget`, { useNewUrlParser: true })
mongoose.set('debug', true)

// Models & routes
require('./auth/models/Users')
require('./auth/config/passport')
app.use(require('./api'))
app.use(require('./auth/route'))

// Error handling
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

app.listen(port, () => console.log('Server running on port:', port))
