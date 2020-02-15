import React, {Component} from 'react'
import TradeForm from './TradeForm'
import {connect} from 'react-redux'
import {addTransactionThunk} from '../store/transactions'
import {getCash} from '../store/cash'
import Cash from './Cash'

class AddTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let {symbol, quantity} = this.state
    let price = this.props.price
    this.props.addTransaction(symbol, price, quantity)
    this.props.getCash()
  }

  handleChange(event) {
    if (event.target.name === 'symbol') {
      this.setState({symbol: event.target.value.toUpperCase()})
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  componentDidMount() {
    this.props.getCash()
  }

  render() {
    console.log('this.state in render', this.state)
    return (
      <div>
        {/* <div className="cash">Cash: ${this.props.cash.toFixed(2)}</div> */}
        <Cash cash={this.props.cash} />
        <TradeForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cash: state.cash,
    price: state.price
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: (symbol, price, quantity) =>
      dispatch(addTransactionThunk(symbol, price, quantity)),
    getCash: () => dispatch(getCash())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
