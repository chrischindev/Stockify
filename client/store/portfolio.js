import axios from 'axios'
import {REMOVE_USER} from './user'

// Action Type
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'

// Action Creator
const gotPortfolio = portfolio => {
  return {
    type: GOT_PORTFOLIO,
    portfolio
  }
}

// Thunk
export const getPortfolio = () => async dispatch => {
  const {data} = await axios.get('/api/portfolio')
  dispatch(gotPortfolio(data))
}

// Reducer
const portfolioReducer = (portfolio = [], action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return action.portfolio
    case REMOVE_USER:
      return []
    default:
      return portfolio
  }
}

export default portfolioReducer
