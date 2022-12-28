import axios from "axios"

export const getCategories = () => {
  return (
    axios.get('/api/categories')
      .then(response => {
      return response
      })
  )
}
