import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import SignUpContainer from './sign-up-form.styles'
import { setCurrentUser } from '../../../store/user/user-action'
import { signUp } from '../../../utils/api/authentication'
import Button from '../../inputs/button/button'
import FormInput from '../../inputs/form-input/form-input'

const defaultFormFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignUpForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {
    username, email, password, confirmPassword,
  } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!username || !email || !password || !confirmPassword) return

    signUp(formFields)
      .then((response) => {
        dispatch(setCurrentUser(response.data))
        navigate('/')
      })
      .catch(() => {
        setFormFields(defaultFormFields)
      })
  }

  return (
    <SignUpContainer>
      <h2>Don&apos;t have an account?</h2>
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
