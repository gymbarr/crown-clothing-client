import axios from "axios"
import store from "../store/store"

import { getToken, saveToken, removeToken } from "./helpers/local-storage-manager"
import { setCurrentUser } from "../store/user/user-action"
import { showFlashMessageAsync } from "../store/flash/flash-action"
import History from "./history"

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

    if (token) {
      saveToken(token)
    } else {
      const user = store.getState().user.currentUser

      removeToken()
      if (user) store.dispatch(setCurrentUser(null))
    }

    return response
  },
  async (error) => {
    const message = error.response.data.errors
    const status = error.response.status
    
    if (status === 401) {
      removeToken()
      store.dispatch(setCurrentUser(null))
      History.push("/auth")
    }

    store.dispatch(showFlashMessageAsync(message))
    
    return Promise.reject(error)
  }
)