import { combineReducers } from "redux"
import { userReducer } from "./user/user-reducer"
import { flashReducer } from "./flash/flash-reducer"
import { cartReducer } from "./cart/cart-reducer"

export const rootReducer = combineReducers({
  user: userReducer,
  flash: flashReducer,
  cart: cartReducer,
})
