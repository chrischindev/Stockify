import axios from 'axios'

// Action Type
const GOT_SYMBOLS = 'GOT_SYMBOLS'

// Action Creator
const gotSymbols = symbols => {
  return {
    type: GOT_SYMBOLS,
    symbols
  }
}

// Thunk
export const getSymbols = () => async dispatch => {
  const {data} = await axios.get('/api/symbols')
  dispatch(gotSymbols(data))
}

// Reducer
const symbolsReducer = (symbols = [], action) => {
  switch (action.type) {
    case GOT_SYMBOLS:
      return action.symbols
    default:
      return symbols
  }
}

export default symbolsReducer
