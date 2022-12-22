import axios from "axios"

export const signUp = (formFields) => {
  const mappedFormFields = {
    username: formFields.username,
    email: formFields.email,
    password: formFields.password,
    password_confirmation: formFields.confirmPassword,
  }

  return (
    axios.post('/api/users', mappedFormFields)
    .then(response => {
      return response.data
    })
  )
}

export const signIn = (formFields) => {
  const mappedFormFields = {
    email: formFields.email,
    password: formFields.password,
  }

  return(
    axios.post('/api/auth/login', mappedFormFields)
    .then(response => {
      return response.data
    })
  )
}
