import { apiRequest } from "../axios"

export const createOrder = (lineItems) => {
  const params = { line_items: lineItems }

  return apiRequest.post(`/orders`, params)
}

export const getOrders = () => (
  apiRequest.get(`/orders`)
)

export const getOrder = (orderId) => (
  apiRequest.get(`/orders/${orderId}`)
)
