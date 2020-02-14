// Cash API

const router = require('express').Router()
const {User} = require('../db/models')

// API route to retrieve user's cash balance
router.get('/', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {id: req.user.id}})

    res.send(user.cash)
  } catch (error) {
    next(error)
  }
})

module.exports = router
