/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPrice, gotBuyMode} from '../store'

class SymbolsInput extends Component {
  // function to close suggestions list and update state if user leaves input field
  closeSuggestions = async e => {
    const value = e.target.value.toUpperCase()
    await this.props.suggestionSelected(value)

    this.props.getPrice(
      this.props.buyMode,
      this.props.symbol,
      this.props.symbols,
      this.props.portfolioSymbols
    )
  }

  renderSuggestions() {
    const suggestions = this.props.suggestions

    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li
            key={item}
            onMouseDown={() => this.props.suggestionSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="SymbolsInput">
        <input
          name="symbol"
          value={this.props.symbol}
          onChange={this.props.handleChange}
          type="text"
          placeholder="Symbol (e.g. AMZN)"
          onBlur={this.closeSuggestions}
          required
          autoComplete="off"
        />
        {this.renderSuggestions()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    price: state.price,
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
    gotBuyMode: () => dispatch(gotBuyMode()),
    getPrice: (buyMode, symbol, symbols, portfolioSymbols) =>
      dispatch(getPrice(buyMode, symbol, symbols, portfolioSymbols))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SymbolsInput)
