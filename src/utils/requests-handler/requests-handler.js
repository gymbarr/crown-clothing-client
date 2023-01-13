import axios from "axios"

const getToken = () => localStorage.getItem("token")

const saveToken = (token) => {
  if (token) return localStorage.setItem("token", token)
}

const removeToken = () => localStorage.removeItem("token")

export const apiRequest = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
})
 
apiRequest.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) config.headers["Authorization"] = token

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiRequest.interceptors.response.use(
  (response) => {
    const token = response.headers.token
    
    saveToken(token)

    return response
  },
  async (error) => {
    // if (error.response) {
    //   if (error.response.status === 401 && error.response.data.errors === "Signature verification failed") {
    //     return Promise.reject("You are not authorized to perform this action")
    //   }
    // }
    const message = error.response.data.errors

    return Promise.reject(message)
  }
)
