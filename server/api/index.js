const router = require('express').Router()

// Middleware to check if user is logged in
router.use((req, res, next) => {
  if (!req.user) {
    res.status(403).send('Unauthorized Access. Please log in to continue')
    res.end()
  } else {
    next()
  }
})

router.use('/symbols', require('./symbols'))
router.use('/transactions', require('./transactions'))
router.use('/portfolio', require('./portfolio'))
router.use('/cash', require('./cash'))
router.use('/price', require('./price'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
