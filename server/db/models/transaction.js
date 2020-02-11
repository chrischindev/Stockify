const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 0
    }
  },
  total: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Transaction
