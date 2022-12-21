import axios from "axios"
import { setCurrentUser } from "../../store/user/user-action"

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
  })
}
