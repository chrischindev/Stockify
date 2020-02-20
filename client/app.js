import React, {Component} from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import AddTransaction from './components/AddTransaction'
import MarketTabs from './components/MarketTabs'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="twoColumns">
          {this.props.isLoggedIn ? (
            <div className="right">
              <MarketTabs />
              <AddTransaction />
            </div>
          ) : null}
          <Routes />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(App)
