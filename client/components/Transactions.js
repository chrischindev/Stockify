import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTransactions, addTransactionThunk} from '../store/transactions'

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    return (
      <div>
        <h3>Transactions</h3>
        {this.props.transactions.map(transaction => {
          return (
            <div key={transaction.id}>
              <span className="date">{transaction.createdAt.slice(0, 10)}</span>{' '}
              {transaction.quantity > 0 ? (
                <span>BUY </span>
              ) : (
                <span>SELL </span>
              )}
              <span className="symbol">{transaction.symbol}</span>{' '}
              <span className="quantity">{transaction.quantity} Shares</span>{' '}
              <span className="price">@ ${transaction.price}</span>{' '}
              <span className="value">
                ${parseFloat(transaction.total).toFixed(2)}
              </span>{' '}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => dispatch(getTransactions()),
    addTransaction: (symbol, price, quantity) =>
      dispatch(addTransactionThunk(symbol, price, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
