import axios from "axios"

export const getCategories = () => {
  return (
    axios.get('/api/categories')
      .then(response => {
      return response
      })
  )
}

export const getProductsOfCategory = (category, itemsCount) => {
  const params = { "items": itemsCount }

  return (
    axios.get(`/api/categories/${category}`, { params: params })
      .then(response => {
      return response
      })
  )
}
