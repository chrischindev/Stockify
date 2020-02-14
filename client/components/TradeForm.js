import React, {Component} from 'react'
import {connect} from 'react-redux'
import SymbolsInput from './SymbolsInput'

const TradeForm = props => {
  return (
    <form className="TradeForm" onSubmit={props.handleSubmit}>
      <SymbolsInput handleChange={props.handleChange} />
      <input
        name="quantity"
        type="number"
        min="1"
        placeholder="Quantity"
        onChange={props.handleChange}
        required
      />
      <button type="submit">BUY</button>
    </form>
  )
}

export default TradeForm
