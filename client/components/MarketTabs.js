import React, {Component} from 'react'

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
