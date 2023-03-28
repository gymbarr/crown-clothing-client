import { apiRequest } from '../axios'

export const createCharge = (orderId, requestedLineItems, backUrl) => {
  const params = { order_id: orderId, requested_line_items: requestedLineItems, back_url: backUrl }

  return apiRequest.post('/charges/create', params)
}
