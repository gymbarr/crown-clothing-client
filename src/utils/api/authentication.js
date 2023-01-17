import { apiRequest } from "../axios"

export const signUp = (formFields) => {
  const mappedFormFields = {
    username: formFields.username,
    email: formFields.email,
    password: formFields.password,
    password_confirmation: formFields.confirmPassword,
  }  

  return (
    apiRequest.post('/users', mappedFormFields)
  )
}

export const signIn = (formFields) => {
  const mappedFormFields = {
    email: formFields.email,
    password: formFields.password,
  }

  return(
    apiRequest.post('/auth/login', mappedFormFields)
  )
}