import { apiRequest } from "../axios"

export const createOrder = (lineItems, username) => {
  const params = { line_items: lineItems }

  return apiRequest.post(`/users/${username}/orders`, params)
}

export const getOrders = (username) => (
  apiRequest.get(`/users/${username}/orders`)
)
