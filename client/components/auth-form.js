import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="authDiv">
      <h1>StockTradr</h1>
      <div id="motto">
        An innovative platform to trade stocks and manage your portfolio.
      </div>
      <form onSubmit={handleSubmit} name={name} className="authForm">
        {name === 'signup' && (
          <div>
            <label htmlFor="userName">Name</label>
            <input name="userName" type="text" required />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
        </div>
        <div className="authButton">
          <button type="submit">{displayName}</button>
        </div>
        {error &&
          error.response && (
            <div className="errorMessage"> {error.response.data} </div>
          )}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const userData = {}
      const formName = evt.target.name
      userData.email = evt.target.email.value
      userData.password = evt.target.password.value
      if (formName === 'signup') {
        userData.name = evt.target.userName.value
      }
      dispatch(auth(userData, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
