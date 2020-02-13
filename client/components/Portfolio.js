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
  render() {
    return (
      <div>
        <h3>Portfolio</h3>
        <h4>
          Portfolio Total: ${this.calculateTotalPortfolio(this.props.portfolio)}
        </h4>
        {this.props.portfolio.map(stock => {
          return (
            <div key={stock.symbol}>
              <span className="symbol">{stock.symbol}</span> -{' '}
              <span className="totalQty">{stock.totalQty}</span> Shares{' '}
              <span className="totalValue">
                $
                {(Math.round(100 * stock.price * stock.totalQty) / 100).toFixed(
                  2
                )}
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
