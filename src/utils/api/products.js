import axios from "axios"

export const getProductsOfCategory = (category) => {
  return (
    axios.get(`/api/categories/${category}`)
      .then(response => {
      return response
      })
  )
}
