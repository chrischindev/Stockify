import React, {Component} from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Transactions extends Component {
  render() {
    return (
      <div>
        <h3>Transactions</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Transactions)
