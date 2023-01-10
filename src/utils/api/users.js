import axios from "axios"

export const getUsers = (token, page) => {
  const headers = { "Authorization": token }
  const params = { "page": page }

  return (
    axios.get('/api/users', { headers: headers, params: params })
      .then(response => {
        return response
      })
  )
}

export const getUser = (username, token) => {
  const headers = { "Authorization": token }

  return (
    axios.get(`/api/users/${username}`, { headers: headers })
      .then(response => {
        return response
      })
  )
}
