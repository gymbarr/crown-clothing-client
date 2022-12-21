import axios from "axios"
import { setCurrentUser } from "../../store/user/user-action"

const saveToLocalStorage = (data) => {
  localStorage.setItem("username", data.username)
  localStorage.setItem("token", data.token)
}

const removeFromLocalStorage = () => {
  localStorage.removeItem("username")
  localStorage.removeItem("token")
}

export const signUp = (userParams, dispatch) => {
  const userParamsConverted = {
    username: userParams.username,
    email: userParams.email,
    password: userParams.password,
    password_confirmation: userParams.confirmPassword
  }

  axios.post('/api/users', userParamsConverted)
  .then(response => {
    dispatch(setCurrentUser(response.data))
    saveToLocalStorage(response.data)
  })
}

export const signIn = (userParams, dispatch) => {
  const userParamsConverted = {
    email: userParams.email,
    password: userParams.password,
  }

  axios.post('/api/auth/login', userParamsConverted)
  .then(response => {
    dispatch(setCurrentUser(response.data))
    saveToLocalStorage(response.data)
  })
}

export const signOut = (dispatch) => {
  dispatch(setCurrentUser(null))
  removeFromLocalStorage()
}
