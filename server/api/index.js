const express = require('express')

const router = express.Router()

router.use(require('./routes/plaid'))

module.exports = router
