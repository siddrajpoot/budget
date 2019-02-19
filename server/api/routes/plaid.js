const express = require('express')

const router = express.Router()
const plaid = require('plaid')

const config = require('../../../config')

const client = new plaid.Client(
  config.client_id,
  config.developmentSecret,
  config.public_key,
  plaid.environments.development,
)

router.post('/get_access_token', (req, res) => {
  const { public_token } = req.body
  console.log('Server', public_token)

  client.exchangePublicToken(public_token, (error, tokenResponse) => {
    if (error != null) {
      console.log(`Could not exchange public_token! ${error}`)
      return res.json({ error })
    }
    const { access_token } = tokenResponse
    const { item_id } = tokenResponse
    console.log(`Access Token: ${access_token}`)
    console.log(`Item ID: ${item_id}`)
    res.json({
      access_token,
      item_id,
    })
  })
})

router.post('/accounts/balace/get', (req, res) => {
  // const { ACCESS_TOKEN } = req.body
  const ACCESS_TOKEN = 'access-development-d4e81fd2-a4a5-4cb6-8873-64230ee11a3e'

  client.getBalance(ACCESS_TOKEN, (err, result) => {
    const { accounts } = result
    console.log(accounts)
  })
})

module.exports = router
