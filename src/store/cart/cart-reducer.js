import { CART_ACTION_TYPES } from "./cart-types"
import { saveCartItems } from "../../utils/helpers/local-storage-manager"

export const CART_INITIAL_STATE = {
  cartItems: [],
}

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_STATE:
      saveCartItems(payload.cartItems)

      return payload
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      saveCartItems(payload)

      return {
        ...state,
        cartItems: payload,
      }

    default:
      return state
  }
}