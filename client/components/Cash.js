import React from 'react'

const Cash = props => {
  return (
    <div className="cash">
      <span>Cash</span> <span id="cashValue">${props.cash.toFixed(2)}</span>
    </div>
  )
}

export default Cash
