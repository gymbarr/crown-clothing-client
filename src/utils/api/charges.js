import { apiRequest } from "../axios"

export const createCharge = (amount) => {
  const params = { amount: amount }

  return apiRequest.post("/charges/create", params)
}
