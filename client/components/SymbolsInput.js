import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSymbols} from '../store/symbols'
import {getPrice, gotPrice} from '../store/price'

class SymbolsInput extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     suggestions: [],
  //     text: ''
  //   }
  // }

  // componentDidMount() {
  //   this.props.getSymbols()
  // }

  // function to update suggestions as user enters text in input
  // onTextChanged = e => {
  //   let value = e.target.value
  //   let lastChar = value[value.length - 1]
  //   let badChars = '/\\*()[]|?'
  //   if (badChars.includes(lastChar)) {
  //     value = value.slice(0, -1)
  //   }
  //   let suggestions = []
  //   if (value.length > 0) {
  //     const regex = new RegExp(`^${value}`, 'i')
  //     suggestions = this.props.symbols.filter(symbol => regex.test(symbol))
  //   }
  //   this.setState(() => ({suggestions, text: value}))

  //   this.props.handleChange(e)
  // }

  // function to close suggestions list and update state if user leaves input field
  closeSuggestions = e => {
    const value = e.target.value.toUpperCase()

    this.props.suggestionSelected(value)
    // Get latest price based on user's input
    if (value) {
      this.props.getPrice(value)
    } else {
      // reset price if user does not enter any symbols
      this.props.gotPrice(0)
    }
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

  renderPrice() {
    const price = this.props.price

    if (price && typeof price === 'number') {
      return <div>Market Price: ${price.toFixed(2)}</div>
    } else if (this.props.symbol && typeof price === 'string') {
      return <div className="invalidSymbol">Please enter a valid symbol.</div>
    }
    return null
  }

  render() {
    // const {text} = this.state

    return (
      <div>
        <div className="SymbolsInput">
          <input
            name="symbol"
            // value={text}
            value={this.props.symbol}
            // onChange={this.onTextChanged}
            onChange={this.props.handleChange}
            type="text"
            placeholder="Ticker"
            onBlur={this.closeSuggestions}
            required
            autoComplete="off"
          />
          {this.renderSuggestions()}
        </div>

        {this.renderPrice()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    price: state.price
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPrice: symbol => dispatch(getPrice(symbol)),
    gotPrice: price => dispatch(gotPrice(price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SymbolsInput)
