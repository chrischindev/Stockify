import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPrice} from '../store'

class MarketTabs extends Component {
  switchMode() {
    this.props.changeMode()
    // console.log('buymode in switchmode ==>', this.props.buyMode)
    // await this.props.setPrice(
    //   this.props.buyMode,
    //   this.props.symbol,
    //   this.props.symbols,
    //   this.props.portfolioSymbols
    // )
  }

  // async componentDidUpdate(prevProps) {
  //   const {buyMode, symbol, symbols, portfolioSymbols} = this.props

  //   if (prevProps.buyMode !== this.props.buyMode) {
  //     console.log('switched mode. new mode is==>', this.props.buyMode)

  //     await this.props.getPrice(buyMode, symbol, symbols, portfolioSymbols)
  //   }
  // }
  render() {
    return (
      <div id="marketTabs">
        <div
          id="buyTab"
          className={this.props.buyMode ? 'openTab' : null}
          onClick={() => {
            if (!this.props.buyMode) {
              this.switchMode()
            }
          }}
        >
          BUY
        </div>
        <div
          id="sellTab"
          className={this.props.buyMode ? null : 'openTab'}
          onClick={() => {
            if (this.props.buyMode) {
              this.switchMode()
            }
          }}
        >
          SELL
        </div>
      </div>
    )
  }
}

// export default MarketTabs

const mapStateToProps = state => {
  return {
    symbol: state.symbol,
    buyMode: state.buyMode,
    symbols: state.symbols,
    portfolioSymbols: state.portfolio
      .filter(stock => stock.totalQty > 0)
      .map(stock => stock.symbol)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPrice: (buyMode, symbol, symbols, portfolioSymbols) =>
      dispatch(getPrice(buyMode, symbol, symbols, portfolioSymbols))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketTabs)
