import React, {Component} from 'react'
import {connect} from 'react-redux'
import SymbolsInput from './SymbolsInput'
import Quantity from './QuantityInput'

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
      return <div className="errorMessage">Please enter a valid symbol.</div>
    }
    return null
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
          symbol={props.symbol}
          symbols={props.symbols}
          suggestions={props.suggestions}
          suggestionSelected={props.suggestionSelected}
        />
      </div>

      {renderPrice()}

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
        {total > props.cash ? (
          <div className="errorMessage">Insufficient funds.</div>
        ) : null}
      </div>

      <button type="submit">BUY</button>
    </form>
  )
}

export default TradeForm
