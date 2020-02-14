import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSymbols} from '../store/symbols'

class SymbolsInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      text: ''
    }
  }

  componentDidMount() {
    this.props.getSymbols()
  }

  // function to update suggestions as user enters text in input
  onTextChanged = e => {
    let value = e.target.value
    let lastChar = value[value.length - 1]
    let badChars = '/\\*()[]|?'
    if (badChars.includes(lastChar)) {
      value = value.slice(0, -1)
    }
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = this.props.symbols.filter(symbol => regex.test(symbol))
    }
    this.setState(() => ({suggestions, text: value}))
    this.props.handleChange(e)
  }

  // function to close suggestions list if user leaves input field
  closeSuggestions = e => {
    const value = e.target.value.toUpperCase()

    this.setState(() => ({
      text: value,
      suggestions: []
    }))
    this.props.handleChange(e)
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }))
  }

  renderSuggestions() {
    const {suggestions} = this.state
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li key={item} onMouseDown={() => this.suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {text} = this.state

    return (
      <div className="SymbolsInput">
        <input
          name="symbol"
          value={text}
          onChange={this.onTextChanged}
          type="text"
          placeholder="Ticker"
          className="symbolsInput"
          onBlur={this.closeSuggestions}
          required
        />
        {this.renderSuggestions()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    symbols: state.symbols
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSymbols: () => dispatch(getSymbols())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SymbolsInput)
