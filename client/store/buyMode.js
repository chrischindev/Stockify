import {REMOVE_USER} from './user'

// Action Type
const GOT_BUYMODE = 'GOT_BUYMODE'
const CHANGE_BUYMODE = 'CHANGE_BUYMODE'

// Action Creator
export const gotBuyMode = () => {
  return {
    type: GOT_BUYMODE
  }
}

export const changeBuyMode = () => {
  return {
    type: CHANGE_BUYMODE
  }
}

// Reducer
const buyModeReducer = (buyMode = true, action) => {
  switch (action.type) {
    case GOT_BUYMODE:
      return buyMode
    case CHANGE_BUYMODE:
      return !buyMode
    case REMOVE_USER:
      return true
    default:
      return buyMode
  }
}

export default buyModeReducer
