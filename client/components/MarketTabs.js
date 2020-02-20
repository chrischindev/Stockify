import React, {Component} from 'react'

class MarketTabs extends Component {
  render() {
    return (
      <div id="marketTabs">
        <div id="buyTab" className="openTab">
          BUY
        </div>
        <div id="sellTab">SELL</div>
      </div>
    )
  }
}

export default MarketTabs
