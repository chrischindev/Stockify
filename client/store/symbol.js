// Action Type
const GOT_SYMBOL = 'GOT_SYMBOL'
const UPDATE_SYMBOL = 'UPDATE_SYMBOL'

// Action Creator
export const gotSymbol = () => {
  return {
    type: GOT_SYMBOL
  }
}

export const updateSymbol = symbol => {
  return {
    type: UPDATE_SYMBOL,
    symbol
  }
}

// Reducer
const symbolReducer = (symbol = '', action) => {
  switch (action.type) {
    case GOT_SYMBOL:
      return symbol
    case UPDATE_SYMBOL:
      return action.symbol
    default:
      return symbol
  }
}

export default symbolReducer
