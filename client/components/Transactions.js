import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTransactions, addTransactionThunk} from '../store/transactions'

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    return (
      <div id="transactionsDiv">
        <h3>Transactions</h3>
        <div id="transactionHeader">
          <span className="dateSpan">Date</span>
          <span className="typeSpan">Type</span>
          <span className="symbolSpan">Symbol</span>
          <span className="sharesSpan">Shares</span>
          <span className="priceSpan">Price</span>
          <span className="totalSpan">Total</span>
        </div>
        {this.props.transactions.length === 0 ? (
          <div>No transactions to show.</div>
        ) : (
          this.props.transactions
            .sort((a, b) => b.id - a.id)
            .map(transaction => {
              return (
                <div key={transaction.id} className="transactionRow">
                  <span className="dateSpan">
                    {transaction.createdAt.slice(0, 10)}
                  </span>
                  {transaction.quantity > 0 ? (
                    <span className="typeSpan">BUY </span>
                  ) : (
                    <span className="typeSpan">SELL </span>
                  )}
                  <span className="symbolSpan">{transaction.symbol}</span>
                  <span className="sharesSpan">
                    {parseInt(transaction.quantity, 10)}
                  </span>
                  <span className="priceSpan">
                    ${parseFloat(transaction.price).toFixed(2)}
                  </span>
                  <span className="totalSpan">
                    ${parseFloat(transaction.total).toFixed(2)}
                  </span>
                </div>
              )
            })
        )}
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
