// Transactions API

const router = require('express').Router()
const {Transaction, User} = require('../db/models')
const Sequelize = require('sequelize')

// API route to serve up a user's transactions
router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {userId: req.user.id}
    })
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})

// API route to post a new purchase
router.post('/purchase', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {id: req.user.id}})
    let cash = +user.cash
    let total = req.body.price * req.body.quantity
    if (total > cash) {
      res
        .status(400)
        .send('Not enough cash to complete transaction. Transaction cancelled.')
    } else {
      let newTransaction = await Transaction.create({
        userId: req.user.id,
        symbol: req.body.symbol.toUpperCase(),
        price: req.body.price,
        quantity: req.body.quantity,
        total: total
      })

      // Subtract transaction total from user's cash balance
      user = await user.update({
        cash: (Math.round(100 * (cash - total)) / 100).toFixed(2)
      })

      res.send(newTransaction)
    }
  } catch (error) {
    next(error)
  }
})

// API route to post a new sale
router.post('/sale', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {id: req.user.id}})
    let cash = +user.cash
    let total = req.body.price * req.body.quantity
    let symbol = req.body.symbol.toUpperCase()
    let quantity = req.body.quantity

    let portfolio = await Transaction.findAll({
      where: {userId: req.user.id, symbol: symbol},
      attributes: [
        'symbol',
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQty']
      ],
      group: ['symbol']
    })

    if (!portfolio) {
      res.status(400).send('You do not have this stock. Transaction cancelled.')
    }

    let stock = portfolio[0]

    if (stock.get('totalQty') < quantity) {
      res
        .status(404)
        .send(
          'You do not have enough shares to complete this sale. Transaction cancelled.'
        )
    } else {
      let newTransaction = await Transaction.create({
        userId: req.user.id,
        symbol: symbol,
        price: req.body.price,
        quantity: -req.body.quantity,
        total: total
      })

      // Add transaction total to user's cash balance
      user = await user.update({
        cash: (Math.round(100 * (cash + total)) / 100).toFixed(2)
      })

      res.send(newTransaction)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
