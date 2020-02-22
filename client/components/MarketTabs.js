import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {gotPrice, getPrice} from '../store/price'

class MarketTabs extends Component {
  render() {
    return (
      <div id="marketTabs">
        <div
          id="buyTab"
          className={this.props.buyMode ? 'openTab' : null}
          onClick={() => {
            if (!this.props.buyMode) {
              this.props.changeMode()
            }
          }}
        >
          BUY
        </div>
        <div
          id="sellTab"
          className={this.props.buyMode ? null : 'openTab'}
          onClick={() => {
            if (this.props.buyMode) {
              this.props.changeMode()
            }
          }}
        >
          SELL
        </div>
      </div>
    )
  }
}

export default MarketTabs

// const mapStateToProps = state => {
//   return {
//     price: state.price
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     resetPrice: () => dispatch(gotPrice(0)),
//     getPrice: symbol => dispatch(getPrice(symbol))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MarketTabs)
