import React, {Component} from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import MarketComponent from './components/MarketComponent'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="twoColumns">
          {this.props.isLoggedIn ? <MarketComponent /> : null}
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
