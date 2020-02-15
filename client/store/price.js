import axios from 'axios'

// Action Type
const GOT_PRICE = 'GOT_PRICE'

// Action Creator
export const gotPrice = price => {
  return {
    type: GOT_PRICE,
    price
  }
}

// Thunk
export const getPrice = symbol => async dispatch => {
  try {
    const {data} = await axios.get(`/api/price/${symbol}`)
    dispatch(gotPrice(data))
  } catch (error) {
    return dispatch(gotPrice('Invalid Symbol'))
  }
}

// Reducer
const priceReducer = (price = 0, action) => {
  switch (action.type) {
    case GOT_PRICE:
      return action.price
    default:
      return price
  }
}

export default priceReducer
