import React, {Component} from 'react'
import {connect} from 'react-redux'
import SymbolsInput from './SymbolsInput'
import Quantity from './QuantityInput'

const TradeForm = props => {
  const total =
    props.price && typeof props.price === 'number' && props.quantity
      ? (Math.round(props.price * props.quantity * 100) / 100).toFixed(2)
      : '0.00'

  return (
    <form className="TradeForm" onSubmit={props.handleSubmit}>
      <label htmlFor="symbol">Ticker</label>
      <SymbolsInput
        handleChange={props.handleChange}
        symbol={props.symbol}
        symbols={props.symbols}
        suggestions={props.suggestions}
        suggestionSelected={props.suggestionSelected}
      />
      <label htmlFor="quantity">Shares</label>
      <Quantity handleChange={props.handleChange} />
      <div>Total: ${total}</div>
      {total > props.cash ? (
        <div className="errorMessage">Insufficient funds.</div>
      ) : null}
      <button type="submit">BUY</button>
    </form>
  )
}

export default TradeForm
