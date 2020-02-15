import React, {Component} from 'react'
import TradeForm from './TradeForm'
import {connect} from 'react-redux'
import {addTransactionThunk} from '../store/transactions'
import {getCash} from '../store/cash'
import Cash from './Cash'
import {getSymbols} from '../store/symbols'
import {gotPrice} from '../store/price'

class AddTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: '',
      quantity: '',
      suggestions: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.suggestionSelected = this.suggestionSelected.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let {symbol, quantity} = this.state
    let price = this.props.price
    if (this.props.symbols.includes(symbol.toUpperCase()) && this.props.price) {
      this.props.addTransaction(symbol, price, quantity)
      this.props.getCash()
    }
    // console.log('symbol in handlesubmit ==>', symbol)
    // console.log(
    //   'in symbols?? =>',
    //   this.props.symbols.includes(symbol.toUpperCase())
    // )
  }

  handleChange(event) {
    if (event.target.name === 'symbol') {
      let value = event.target.value
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
      //update suggestions list and symbol as user enters text
      this.setState(() => ({suggestions, symbol: value}))

      // reset price as user is entering text
      this.props.resetPrice()
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  suggestionSelected(value) {
    this.setState(() => ({
      symbol: value,
      suggestions: []
    }))
  }

  componentDidMount() {
    this.props.getCash()
    this.props.getSymbols()
  }

  render() {
    console.log('this.state in render', this.state)
    return (
      <div>
        <Cash cash={this.props.cash} />
        <TradeForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          price={this.props.price}
          quantity={this.state.quantity}
          cash={this.props.cash}
          symbol={this.state.symbol}
          symbols={this.props.symbols}
          suggestions={this.state.suggestions}
          suggestionSelected={this.suggestionSelected}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cash: state.cash,
    price: state.price,
    symbols: state.symbols
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: (symbol, price, quantity) =>
      dispatch(addTransactionThunk(symbol, price, quantity)),
    getCash: () => dispatch(getCash()),
    getSymbols: () => dispatch(getSymbols()),
    resetPrice: () => dispatch(gotPrice(0))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
