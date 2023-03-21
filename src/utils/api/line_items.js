import { apiRequest } from "../axios"

export const decrementLineItemQuantity = (lineItemId) => (
  apiRequest.post(`/line_items/${lineItemId}/decrement_quantity`)
)

export const incrementLineItemQuantity = (lineItemId) => (
  apiRequest.post(`/line_items/${lineItemId}/increment_quantity`)
)

export const removeLineItem = (lineItemId) => (
  apiRequest.delete(`/line_items/${lineItemId}`)
)
