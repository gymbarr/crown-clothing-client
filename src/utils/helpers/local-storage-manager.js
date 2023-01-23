export const saveToken = (token) => {
  if (token) return localStorage.setItem("token", token)
}

export const loadToken = () => localStorage.getItem("token")

export const removeToken = () => localStorage.removeItem("token")

export const saveCartItems = (cartItems) => {
  if (cartItems) {
    const cartState = JSON.parse(localStorage.getItem("cartState"))

    return localStorage.setItem("cartState", JSON.stringify({ ...cartState, cartItems: cartItems }))
  }
}

export const loadCartState = () => JSON.parse(localStorage.getItem("cartState"))