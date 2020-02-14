import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSymbols} from '../store/symbols'

class AutoCompleteText extends Component {
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
  }

  renderSuggestions() {
    const {suggestions} = this.state
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li key={item} onClick={() => this.suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    )
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }))
  }

  render() {
    const {text} = this.state
    return (
      <div className="AutoCompleteText">
        <input
          value={text}
          onChange={this.onTextChanged}
          type="text"
          placeholder="Ticker"
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

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteText)
