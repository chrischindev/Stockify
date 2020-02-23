import axios from 'axios'
import {REMOVE_USER} from './user'

// Action Type
const GOT_PRICE = 'GOT_PRICE'
const GOT_ERROR = 'GOT_ERROR'

// Action Creator
export const gotPrice = price => {
  return {
    type: GOT_PRICE,
    price
  }
}

export const gotError = error => {
  return {
    type: GOT_ERROR,
    error
  }
}

// Thunk
// export const getPrice = symbol => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/price/${symbol}`)
//     dispatch(gotPrice(data))
//   } catch (error) {
//     dispatch(gotError('Invalid Symbol'))
//   }
// }

export const getPrice = (
  buyMode,
  symbol,
  symbols,
  portfolioSymbols
) => async dispatch => {
  try {
    // symbolList will either be all symbols (when purchasing) or portfolioSymbols (when selling)
    // const symbolList = buyMode ? symbols : portfolioSymbols

    if (symbol) {
      if (symbols.includes(symbol)) {
        // Get latest price based on user's input
        const {data} = await axios.get(`/api/price/${symbol}`)
        dispatch(gotPrice(data))
      } else if (!symbols.includes(symbol)) {
        dispatch(gotError('Please enter a valid symbol.'))
      }
      // else if (!buyMode && !portfolioSymbols.includes(symbol)) {
      //   dispatch(gotError('You do not own this stock.'))
      // }
    } else {
      // reset price if user does not enter any symbols
      dispatch(gotPrice(0))
    }
  } catch (error) {
    dispatch(gotError(Error))
  }
}

// Reducer
const priceReducer = (price = 0, action) => {
  switch (action.type) {
    case GOT_PRICE:
      return action.price
    case GOT_ERROR:
      return action.error
    case REMOVE_USER:
      return 0
    default:
      return price
  }
}

export default priceReducer
