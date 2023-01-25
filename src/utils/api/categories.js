import { apiRequest } from "../axios"

export const getCategories = () => {
  return apiRequest.get("/categories")
}
