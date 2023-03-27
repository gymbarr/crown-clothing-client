import CART_ACTION_TYPES from './cart-types'
import { createAction } from '../../utils/reducer/reducer'

const addCartItem = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id,
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) => (
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ))
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

const changeItemQuantity = (cartItems, cartItemToChangeQuantity, value) => {
  if (
    (cartItemToChangeQuantity.quantity <= 1 && value < 0)
    || (cartItemToChangeQuantity.quantity
      >= cartItemToChangeQuantity.availableQuantity
      && value > 0)
  ) {
    return cartItems
  }

  return cartItems.map((cartItem) => (
    cartItem.id === cartItemToChangeQuantity.id
      ? { ...cartItem, quantity: cartItem.quantity + value }
      : cartItem
  ))
}

const removeCartItem = (cartItems, cartItemToRemove) => (
  cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
)

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const changeCartItemQuantity = (
  cartItems,
  cartItemToChangeQuantity,
  value,
) => {
  const newCartItems = changeItemQuantity(
    cartItems,
    cartItemToChangeQuantity,
    value,
  )
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setCartState = (cartState) => createAction(CART_ACTION_TYPES.SET_CART_STATE, cartState)
