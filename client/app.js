import React, {Component} from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import AddTransaction from './components/AddTransaction'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          {this.props.isLoggedIn ? <AddTransaction /> : null}
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

// export default App
