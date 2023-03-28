import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SignInContainer } from './sign-in-form.styles'
import { setCurrentUser } from '../../../store/user/user-action'
import { signIn } from '../../../utils/api/authentication'
import Button from '../../inputs/button/button'
import FormInput from '../../inputs/form-input/form-input'

const defaultFormFields = {
  email: '',
  password: '',
}

function SignInForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) return

    signIn(formFields)
      .then((response) => {
        dispatch(setCurrentUser(response.data))
        navigate('/')
      })
      .catch(() => {
        setFormFields(defaultFormFields)
      })
  }

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
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
        <Button type="submit">Sign In</Button>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
