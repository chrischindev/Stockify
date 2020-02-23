import React from 'react'
import SymbolsInput from './SymbolsInput'
import Quantity from './QuantityInput'
// import Price from './Price'

const TradeForm = props => {
  const total =
    props.price && typeof props.price === 'number' && props.quantity
      ? (Math.round(props.price * props.quantity * 100) / 100).toFixed(2)
      : '0.00'

  function renderPrice() {
    const price = props.price

    if (price && typeof price === 'number') {
      return (
        <div id="priceDiv">
          <span>Market Price</span> <span id="price">${price.toFixed(2)}</span>
        </div>
      )
    } else if (props.symbol && typeof price === 'string') {
      return <div className="errorMessage">{price}</div>
    }
    return null
  }

  function renderStockError() {
    const buyMode = props.buyMode
    const symbol = props.symbol
    const portfolioSymbols = props.portfolioSymbols
    const price = props.price
    if (
      symbol &&
      price &&
      typeof price !== 'string' &&
      !buyMode &&
      !portfolioSymbols.includes(symbol)
    ) {
      return <div className="errorMessage">You do not own this stock.</div>
    } else {
      return null
    }
  }

  function renderQtyError() {
    const quantity = parseFloat(props.quantity)
    if (quantity && !Number.isInteger(quantity)) {
      return <div className="errorMessage">Please enter a whole number.</div>
    } else {
      return null
    }
  }

  return (
    <form className="TradeForm" onSubmit={props.handleSubmit}>
      <div id="symbolsDiv">
        <label htmlFor="symbol">Ticker</label>
        <SymbolsInput
          handleChange={props.handleChange}
          symbols={props.symbols}
          suggestions={props.suggestions}
          suggestionSelected={props.suggestionSelected}
          portfolioSymbols={props.portfolioSymbols}
          buyMode={props.buyMode}
        />
      </div>

      {renderPrice()}

      {renderStockError()}

      <div id="qtyDiv">
        <label htmlFor="quantity">Shares</label>
        <Quantity handleChange={props.handleChange} />
      </div>

      {renderQtyError()}

      <div className="break" />
      <div id="totalDiv">
        <div id="totalInfo">
          <span>Total</span> <span id="totalValue">${total}</span>
        </div>
        {total > props.cash && props.buyMode ? (
          <div className="errorMessage">Insufficient funds.</div>
        ) : null}
      </div>

      <button type="submit">{props.buyMode ? 'BUY' : 'SELL'}</button>
    </form>
  )
}

export default TradeForm
