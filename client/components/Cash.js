import React, {Component} from 'react'

const Cash = props => {
  return <div className="cash">Cash: ${props.cash.toFixed(2)}</div>
}

export default Cash
