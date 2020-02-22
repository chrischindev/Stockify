import React, {Component, useState} from 'react'
import AddTransaction from './AddTransaction'
import MarketTabs from './MarketTabs'
import {connect} from 'react-redux'
import {getSymbols} from '../store/symbols'
import {gotPrice, getPrice} from '../store/price'
import {getPortfolio} from '../store/portfolio'
import {changeBuyMode} from '../store/buyMode'

// function MarketComponent() {
//   const [buyMode, setBuyMode] = useState(true) // set default buy mode to true

//   function changeMode() {
//     setBuyMode(!buyMode)
//   }
//   return (
//     <div className="right" data-aos="fade-left">
//       <MarketTabs buyMode={buyMode} changeMode={changeMode} />
//       <AddTransaction buyMode={buyMode} />
//     </div>
//   )
// }

class MarketComponent extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     buyMode: true
  //   }
  //   this.changeMode = this.changeMode.bind(this)
  // }

  // componentDidMount() {}
  // changeMode() {
  //   this.setState(prevState => {
  //     return {buyMode: !prevState.buyMode}
  //   })
  // }

  setPrice() {
    const buyMode = this.props.buyMode
    const symbol = this.props.symbol
    const symbols = this.props.symbols
    const portfolioSymbols = this.props.portfolioSymbols

    // symbolList will either be all symbols (when purchasing) or portfolioSymbols (when selling)
    const symbolList = buyMode ? symbols : portfolioSymbols

    if (symbol) {
      if (symbolList.includes(symbol)) {
        // Get latest price based on user's input
        this.props.getPrice(symbol)
      } else if (!symbols.includes(symbol)) {
        this.props.gotPrice('Please enter a valid symbol.')
      } else if (!buyMode && !portfolioSymbols.includes(symbol)) {
        this.props.gotPrice('You do not own this stock.')
      }
    } else {
      // reset price if user does not enter any symbols
      this.props.gotPrice(0)
    }
  }

  render() {
    return (
      <div className="right" data-aos="fade-left">
        <MarketTabs
          buyMode={this.props.buyMode}
          changeMode={this.props.changeBuyMode}
        />
        <AddTransaction buyMode={this.props.buyMode} />
      </div>
    )
  }
}

// export default MarketComponent

const mapStateToProps = state => {
  return {
    price: state.price,
    symbols: state.symbols,
    portfolio: state.portfolio,
    portfolioSymbols: state.portfolio
      .filter(stock => stock.totalQty > 0)
      .map(stock => stock.symbol),
    buyMode: state.buyMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSymbols: () => dispatch(getSymbols()),
    resetPrice: () => dispatch(gotPrice(0)),
    getPortfolio: () => dispatch(getPortfolio()),
    getPrice: symbol => dispatch(getPrice(symbol)),
    gotPrice: price => dispatch(gotPrice(price)),
    changeBuyMode: () => dispatch(changeBuyMode())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketComponent)
