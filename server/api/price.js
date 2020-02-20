// Price API

const router = require('express').Router()
const axios = require('axios')
const {iexAPITestKey} = require('../../secrets')
// const iexAPIKey = process.env.iexAPIKey

// API route to retrieve the latest price for a symbol
router.get('/:symbol', async (req, res, next) => {
  try {
    let symbol = req.params.symbol
    // Test API call
    const {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote&token=${iexAPITestKey}`
    )

    // Actual API call
    // const {data} = await axios.get(
    //   `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote&token=${iexAPIKey}`
    // )

    res.json(data[symbol].quote.latestPrice)
  } catch (error) {
    next(error)
  }
})

module.exports = router
