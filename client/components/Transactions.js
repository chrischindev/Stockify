import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTransactions, addTransactionThunk} from '../store/transactions'
// import TradeForm from './TradeForm'
import AddTransaction from './AddTransaction'

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    return (
      <div>
        <h3>Transactions</h3>
        {this.props.transactions.length === 0 ? (
          <div>No transactions to show.</div>
        ) : (
          this.props.transactions
            .sort((a, b) => b.id - a.id)
            .map(transaction => {
              return (
                <div key={transaction.id}>
                  <span className="date">
                    {transaction.createdAt.slice(0, 10)}
                  </span>{' '}
                  {transaction.quantity > 0 ? (
                    <span>BUY </span>
                  ) : (
                    <span>SELL </span>
                  )}
                  <span className="symbol">{transaction.symbol}</span>{' '}
                  <span className="quantity">
                    {transaction.quantity} Shares
                  </span>{' '}
                  <span className="price">
                    @ ${parseFloat(transaction.price).toFixed(2)}
                  </span>{' '}
                  <span className="value">
                    ${parseFloat(transaction.total).toFixed(2)}
                  </span>{' '}
                </div>
              )
            })
        )}
        {/* <TradeForm /> */}
        <AddTransaction />
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
