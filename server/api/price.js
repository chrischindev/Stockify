// Price API

const router = require('express').Router()
const axios = require('axios')
const {iexAPITestKey, iexAPITestPubKey} = require('../../secrets')

// API route to retrieve the latest price for a symbol
router.get('/:symbol', async (req, res, next) => {
  try {
    let symbol = req.params.symbol
    let {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${iexAPITestKey}`
    )

    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
