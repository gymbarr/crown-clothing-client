import { apiRequest } from "../axios"

export const createCharge = (requestedLineItems, backUrl) => {
  const params = { requested_line_items: requestedLineItems, back_url: backUrl }

  return apiRequest.post("/charges/create", params)
}
