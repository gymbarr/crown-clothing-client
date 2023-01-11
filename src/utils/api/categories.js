import axios from "axios"

export const getCategories = (token = null) => {
  const headers = token ? { "Authorization": token } : {}

  return (
    axios.get('/api/categories', { headers: headers })
  )
}

export const getProductsOfCategory = (category, itemsPerPage, page, token = null) => {
  const headers = token ? { "Authorization": token } : {}
  const params = { "items": itemsPerPage, page: page }

  return (
    axios.get(`/api/categories/${category}`, { headers: headers, params: params  })
  )
}
