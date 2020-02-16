import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/portfolio'

class Portfolio extends Component {
  componentDidMount() {
    this.props.getPortfolio()
  }

  calculateTotalPortfolio(portfolio) {
    let total = 0
    portfolio.forEach(stock => {
      total += stock.price * stock.totalQty
    })

    return (Math.round(100 * total) / 100).toFixed(2)
  }

  setStockClassName(change) {
    if (change > 0) {
      return 'PositiveChange'
    } else if (change < 0) {
      return 'NegativeChange'
    } else {
      return 'NoChange'
    }
  }
  render() {
    return (
      <div>
        <h3>Portfolio</h3>
        <h4>
          Portfolio Total: ${this.calculateTotalPortfolio(this.props.portfolio)}
        </h4>
        {this.props.portfolio
          // Sort Portfolio alphabetically
          .sort((a, b) => {
            if (a.symbol < b.symbol) {
              return -1
            } else if (a.symbol > b.symbol) {
              return 1
            }
            return 0
          })
          // map through portfolio to render each stock in a div
          .map(stock => {
            return (
              <div key={stock.symbol} className="stockRow">
                <span
                  className={'symbol ' + this.setStockClassName(stock.change)}
                >
                  {stock.symbol}
                </span>{' '}
                -{' '}
                <span className="totalQty">{parseInt(stock.totalQty, 10)}</span>{' '}
                Shares{' '}
                <span
                  className={
                    'totalValue ' + this.setStockClassName(stock.change)
                  }
                >
                  $
                  {(
                    Math.round(100 * stock.price * stock.totalQty) / 100
                  ).toFixed(2)}
                </span>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
