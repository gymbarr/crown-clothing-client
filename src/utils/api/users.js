import { apiRequest } from "../axios"

export const getUsers = (page) => {
  const params = { page: page }

  return apiRequest.get("/users", { params: params })
}

export const getCurrentUser = () => {
  return apiRequest.get("/user/me")
}
