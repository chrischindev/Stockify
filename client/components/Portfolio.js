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
      <div id="portfolioDiv" data-aos="fade-right">
        <h3>Portfolio ${this.calculateTotalPortfolio(this.props.portfolio)}</h3>
        <div id="portfolioHeader">
          <span className="symbolSpan">Symbol</span>
          <span className="sharesSpan">Shares</span>
          <span className="changeSpan">Change($/share)</span>
          <span className="totalSpan">Current Value</span>
        </div>
        {this.props.portfolio.length === 0 ? (
          <div>No stocks to show.</div>
        ) : (
          this.props.portfolio
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
                <div key={stock.symbol} className="portfolioRow">
                  <span
                    className={
                      'symbolSpan ' + this.setStockClassName(stock.change)
                    }
                  >
                    {stock.symbol}
                  </span>
                  <span className="sharesSpan">
                    {parseInt(stock.totalQty, 10)}
                  </span>
                  <span
                    className={
                      'changeSpan ' + this.setStockClassName(stock.change)
                    }
                  >
                    {stock.change < 0 ? '- ' : null}$
                    {Math.abs(stock.change).toFixed(2)}
                  </span>
                  <span
                    className={
                      'totalSpan ' + this.setStockClassName(stock.change)
                    }
                  >
                    $
                    {(
                      Math.round(100 * stock.price * stock.totalQty) / 100
                    ).toFixed(2)}
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
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
