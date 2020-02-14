// Transactions API

const router = require('express').Router()
const {Transaction, User} = require('../db/models')

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

// API route to post a new transaction
router.post('/', async (req, res, next) => {
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

module.exports = router
