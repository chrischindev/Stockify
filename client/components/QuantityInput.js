import React, {Component} from 'react'

class QuantityInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
  }

  onQuantityChange = event => {
    let number = event.target.value
    this.setState(() => ({quantity: number}))
    this.props.handleChange(event)
  }

  render() {
    const {quantity} = this.state
    return (
      <div>
        <input
          name="quantity"
          type="number"
          value={quantity}
          min="1"
          placeholder="0"
          onChange={this.onQuantityChange}
          required
          className="tradeQuantity"
        />
      </div>
    )
  }
}

export default QuantityInput
