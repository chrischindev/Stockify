// Transactions API

const router = require('express').Router()
const {Transaction} = require('../db/models')

// Middleware to check if user is logged in
router.use((req, res, next) => {
  if (!req.user) {
    res.status(403).send('Unauthorized Access. Please log in to continue')
    res.end()
  } else {
    next()
  }
})

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
    let newTransaction = await Transaction.create({
      userId: req.user.id,
      symbol: req.body.symbol,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.price * req.body.quantity
    })
    res.send(newTransaction)
  } catch (error) {
    next(error)
  }
})

module.exports = router
