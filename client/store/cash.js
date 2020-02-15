import axios from 'axios'
import {REMOVE_USER} from './user'
import {ADD_TRANSACTION} from './transactions'

// Action Type
const GOT_CASH = 'GOT_CASH'

// Action Creator
const gotCash = cash => {
  return {
    type: GOT_CASH,
    cash
  }
}

// Thunk
export const getCash = () => async dispatch => {
  const {data} = await axios.get('/api/cash')
  dispatch(gotCash(data))
}

// Reducer
const cashReducer = (cash = 0, action) => {
  switch (action.type) {
    case GOT_CASH:
      return action.cash
    case REMOVE_USER:
      return 0
    case ADD_TRANSACTION:
      return cash - action.transaction.total
    default:
      return cash
  }
}

export default cashReducer
