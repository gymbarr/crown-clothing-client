import { apiRequest } from "../requests-handler/requests-handler"

export const getUsers = (page) => {
  const params = { "page": page }

  return (
    apiRequest.get("/users", { params: params })
  )
}

export const getCurrentUser = () => {
  return (
    apiRequest.get("/user/me")
  )
}
