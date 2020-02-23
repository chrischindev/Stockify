import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import portfolio from './portfolio'
import transactions from './transactions'
import symbols from './symbols'
import cash from './cash'
import price from './price'
import buyMode from './buyMode'
import symbol from './symbol'

const reducer = combineReducers({
  user,
  portfolio,
  transactions,
  symbols,
  cash,
  price,
  buyMode,
  symbol
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './symbol'
export * from './price'
export * from './buyMode'
export * from './transactions'
