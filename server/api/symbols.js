// Symbols API

const router = require('express').Router()
const axios = require('axios')
const {iexAPITestKey, iexAPITestPubKey} = require('../../secrets')

// API route to retrieve all ticker symbols
router.get('/', async (req, res, next) => {
  try {
    let {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/ref-data/iex/symbols?token=${iexAPITestKey}`
    )
    data = data.map(stock => stock.symbol)
    res.send(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
