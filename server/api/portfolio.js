// Portfolio API

const router = require('express').Router()
const {Transaction} = require('../db/models')
const Sequelize = require('sequelize')
const axios = require('axios')
// const {iexAPITestKey, iexAPITestPubKey, iexAPIKey} = require('../../secrets')
const iexAPIKey = process.env.iexAPIKey

/**
 * function to retrieve quote information for multiple stocks
 * @param {string[]} symbols
 */
async function getBulkQuote(symbols) {
  symbols = symbols.join(',')

  // Test API call
  // const {data} = await axios.get(
  //   `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${iexAPITestKey}`
  // )

  // Actual API call
  const {data} = await axios.get(
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${iexAPIKey}`
  )

  return data
}

// API route to serve up a user's portfolio
router.get('/', async (req, res, next) => {
  try {
    let portfolio = await Transaction.findAll({
      where: {userId: req.user.id},
      attributes: [
        'symbol',
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQty']
      ],
      group: ['symbol']
    })

    if (portfolio.length) {
      const symbols = portfolio.map(stock => stock.symbol)
      const quotes = await getBulkQuote(symbols)
      portfolio = portfolio.map(stock => {
        const stockInfo = {}
        stockInfo.symbol = stock.symbol
        stockInfo.totalQty = stock.dataValues.totalQty
        stockInfo.price = quotes[stock.symbol].quote.latestPrice
        stockInfo.change = quotes[stock.symbol].quote.change
        return stockInfo
      })
    }

    res.json(portfolio)
  } catch (error) {
    next(error)
  }
})

module.exports = router
