// Portfolio API

const router = require('express').Router()
const {Transaction} = require('../db/models')
const Sequelize = require('sequelize')

// Middleware to check if user is logged in
router.use((req, res, next) => {
  if (!req.user) {
    res.status(403).send('Unauthorized Access. Please log in to continue')
    res.end()
  } else {
    next()
  }
})

// API route to serve up a user's portfolio
router.get('/', async (req, res, next) => {
  try {
    const portfolio = await Transaction.findAll({
      where: {userId: req.user.id},
      attributes: [
        'symbol',
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQty']
      ],
      group: ['symbol']
    })
    res.json(portfolio)
  } catch (error) {
    next(error)
  }
})

module.exports = router
