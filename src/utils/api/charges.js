import { apiRequest } from "../axios"

export const createCharge = (amount, backUrl) => {
  const params = { amount: amount, back_url: backUrl }

  return apiRequest.post("/charges/create", params)
}
