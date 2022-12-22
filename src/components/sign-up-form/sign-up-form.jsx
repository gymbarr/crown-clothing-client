import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import FormInput from "../form-input/form-input"
import Button from "../button/button"
import { signUp } from "../../utils/api/authentication"
import { setCurrentUser } from "../../store/user/user-action"
import { saveUserToLocalStorage } from "../../utils/local-storage/user-data"

import { SignUpContainer } from "./sign-up-form.styles"

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { username, email, password, confirmPassword } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!username || !email || !password || !confirmPassword) return

    // const formData = Object.fromEntries(new FormData(event.target))

    signUp(formFields)
    .then(userData => {
      dispatch(setCurrentUser(userData))
      saveUserToLocalStorage(userData)
    })

    navigate('/')
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm
