import React, {Component} from 'react'
import TradeForm from './TradeForm'
import {connect} from 'react-redux'
import {addTransactionThunk} from '../store/transactions'
import {getCash} from '../store/cash'
import Cash from './Cash'
import {getSymbols} from '../store/symbols'
import {gotPrice} from '../store/price'
import {getPortfolio} from '../store/portfolio'
import {gotSymbol, updateSymbol} from '../store'

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
    this.isValidTransaction = this.isValidTransaction.bind(this)
  }

  // Function to determine if sale or purchase is valid based on current state and props: symbol, quantity, mode, price and cash
  isValidTransaction() {
    const {symbol, quantity} = this.state
    const price = this.props.price
    const buyMode = this.props.buyMode

    const validPurchase =
      buyMode &&
      this.props.symbols.includes(symbol.toUpperCase()) &&
      price &&
      price * quantity < this.props.cash

    const validSale =
      !buyMode && this.props.portfolioSymbols.includes(symbol.toUpperCase())

    return validPurchase || validSale
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {symbol, quantity} = this.state
    const price = this.props.price
    if (this.isValidTransaction()) {
      await this.props.addTransaction(symbol, price, quantity)
      await this.props.getCash()
      await this.props.getPortfolio()
    }
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

        // If buying stock, the symbol suggestions list will come from a filtered version of all valid symbols.
        //If selling stock, the symbol suggestions list will come from a filtered version of only stocks the user owns
        suggestions = this.props[
          this.props.buyMode ? 'symbols' : 'portfolioSymbols'
        ].filter(symbol => regex.test(symbol))
      }
      // update suggestions list and symbol as user enters text
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

  async componentDidMount() {
    await this.props.getCash()
    await this.props.getSymbols()
  }

  render() {
    return (
      <div
        id="transactionForm"
        className={this.props.buyMode ? 'buyMode' : 'sellMode'}
      >
        <div id="transactionTopDiv" />
        <Cash cash={this.props.cash} />
        <div className="break" />
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
          type={this.state.type}
          buyMode={this.props.buyMode}
          portfolioSymbols={this.props.portfolioSymbols}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cash: state.cash,
    price: state.price,
    symbols: state.symbols,
    portfolio: state.portfolio,
    portfolioSymbols: state.portfolio
      .filter(stock => stock.totalQty > 0)
      .map(stock => stock.symbol)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: (symbol, price, quantity) =>
      dispatch(addTransactionThunk(symbol, price, quantity)),
    getCash: () => dispatch(getCash()),
    getSymbols: () => dispatch(getSymbols()),
    resetPrice: () => dispatch(gotPrice(0)),
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
