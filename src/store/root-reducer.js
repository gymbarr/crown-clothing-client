import { combineReducers } from 'redux'

import { cartReducer } from './cart/cart-reducer'
import flashReducer from './flash/flash-reducer'
import userReducer from './user/user-reducer'

const rootReducer = combineReducers({
  user: userReducer,
  flash: flashReducer,
  cart: cartReducer,
})

export default rootReducer
