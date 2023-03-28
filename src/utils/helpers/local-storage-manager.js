export const saveToken = (token) => {
  if (token) return localStorage.setItem('token', token)
  return null
}

export const loadToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')

export const saveCartItems = (cartItems) => {
  if (cartItems) {
    const cartState = JSON.parse(localStorage.getItem('cartState'))

    return localStorage.setItem('cartState', JSON.stringify({ ...cartState, cartItems }))
  }
  return null
}

export const loadCartState = () => JSON.parse(localStorage.getItem('cartState'))
