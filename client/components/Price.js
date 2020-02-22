import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPrice, gotPrice} from '../store/price'

class Price extends Component {
  // constructor(props){
  //   super(props)
  // }

  // componentDidMount() {
  //   console.log('Price component mounted')
  //   this.setPrice()
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.symbol !== prevProps.symbol) {
  //     console.log('UPDATED')
  //     this.setPrice()
  //   }
  // }

  render() {
    const price = this.props.price
    if (price && typeof price === 'number') {
      return (
        <div id="priceDiv">
          <span>Market Price</span> <span id="price">${price.toFixed(2)}</span>
        </div>
      )
    } else if (this.props.symbol && typeof price === 'string') {
      return <div className="errorMessage">{price}</div>
    }
    return null
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

export default connect(mapStateToProps, mapDispatchToProps)(Price)
