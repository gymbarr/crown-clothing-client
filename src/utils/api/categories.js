import axios from "axios"

export const getCategories = () => {
  return (
    axios.get('/api/categories')
      .then(response => {
      return response
      })
  )
}

export const getProductsOfCategory = (category, itemsPerPage, page) => {
  const params = { "items": itemsPerPage, page: page }

  return (
    axios.get(`/api/categories/${category}`, { params: params })
      .then(response => {
      return response
      })
  )
}
