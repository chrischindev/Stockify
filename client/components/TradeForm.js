import React, {Component} from 'react'
import {connect} from 'react-redux'
import SymbolsInput from './SymbolsInput'

const TradeForm = props => {
  return (
    <form className="TradeForm" onSubmit={props.handleSubmit}>
      <label htmlFor="symbol">Ticker</label>
      <SymbolsInput handleChange={props.handleChange} />
      <label htmlFor="quantity">Shares</label>
      <input
        name="quantity"
        type="number"
        min="1"
        placeholder="Quantity"
        onChange={props.handleChange}
        required
        className="tradeQuantity"
      />
      <button type="submit">BUY</button>
    </form>
  )
}

export default TradeForm
