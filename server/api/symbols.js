// Symbols API

const router = require('express').Router()
const axios = require('axios')
// const {iexAPITestKey, iexAPITestPubKey, iexAPIKey} = require('../../secrets')
const iexAPIKey = process.env.iexAPIKey

// API route to retrieve all ticker symbols
router.get('/', async (req, res, next) => {
  try {
    // Test API call
    // let {data} = await axios.get(
    //   `https://sandbox.iexapis.com/stable/ref-data/iex/symbols?token=${iexAPITestKey}`
    // )

    // Actual API call
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=${iexAPIKey}`
    )

    data = data
      .filter(stock => stock.isEnabled)
      .map(stock => stock.symbol)
      .sort()
    res.send(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
