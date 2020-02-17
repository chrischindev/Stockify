import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPrice, gotPrice} from '../store/price'

class SymbolsInput extends Component {
  // function to close suggestions list and update state if user leaves input field
  closeSuggestions = e => {
    const value = e.target.value.toUpperCase()

    this.props.suggestionSelected(value)
    // Get latest price based on user's input
    if (value && this.props.symbols.includes(value)) {
      this.props.getPrice(value)
    } else if (value && !this.props.symbols.includes(value)) {
      this.props.gotPrice('Invalid Symbol')
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
