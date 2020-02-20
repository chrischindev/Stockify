import React, {useState} from 'react'
import AddTransaction from './AddTransaction'
import MarketTabs from './MarketTabs'

function MarketComponent() {
  const [buyMode, setBuyMode] = useState(true) // set default buy mode to true

  function changeMode() {
    setBuyMode(!buyMode)
  }
  return (
    <div className="right" data-aos="fade-left">
      <MarketTabs buyMode={buyMode} changeMode={changeMode} />
      <AddTransaction buyMode={buyMode} />
    </div>
  )
}

export default MarketComponent
