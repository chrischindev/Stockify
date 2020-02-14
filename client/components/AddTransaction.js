import React, {Component} from 'react'
import TradeForm from './TradeForm'
import {connect} from 'react-redux'
import {addTransactionThunk} from '../store/transactions'
import {getCash} from '../store/cash'

class AddTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: '',
      price: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let {symbol, price, quantity} = this.state
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
        <div>Cash: ${this.props.cash}</div>
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
    cash: state.cash
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
