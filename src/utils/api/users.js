import axios from "axios"

export const getUsers = (token) => {
  const headers = { "Authorization": token }

  return (
    axios.get('/api/users', { headers: headers })
      .then(response => {
        return response
      })
  )
}
