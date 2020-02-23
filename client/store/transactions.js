import axios from 'axios'
import {REMOVE_USER} from './user'

// Action Type
const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'

// Action Creator
const gotTransactions = transactions => {
  return {
    type: GOT_TRANSACTIONS,
    transactions
  }
}

const addTransaction = transaction => {
  return {
    type: ADD_TRANSACTION,
    transaction
  }
}

// Thunk
export const getTransactions = () => async dispatch => {
  const {data} = await axios.get('/api/transactions')
  dispatch(gotTransactions(data))
}

export const addPurchase = (symbol, price, quantity) => {
  return async dispatch => {
    const {data} = await axios.post('/api/transactions/purchase', {
      symbol,
      price,
      quantity
    })
    dispatch(addTransaction(data))
  }
}

export const addSale = (symbol, price, quantity) => {
  return async dispatch => {
    const {data} = await axios.post('/api/transactions/sale', {
      symbol,
      price,
      quantity
    })
    dispatch(addTransaction(data))
  }
}

// Reducer
const transactionsReducer = (transactions = [], action) => {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions
    case ADD_TRANSACTION:
      return [action.transaction, ...transactions]
    case REMOVE_USER:
      return []
    default:
      return transactions
  }
}

export default transactionsReducer
