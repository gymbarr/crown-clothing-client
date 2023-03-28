import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AuthenticationContainer from './authentication.styles'
import Loader from '../../components/feedback/loader/loader'
import SignInForm from '../../components/users/sign-in-form/sign-in-form'
import SignUpForm from '../../components/users/sign-up-form/sign-up-form'
import { showFlashMessageAsync } from '../../store/flash/flash-action'
import {
  selectCurrentUser,
  selectCurrentUserIsLoading,
} from '../../store/user/user-selector'

const Authentication = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const currentUserIsLoading = useSelector(selectCurrentUserIsLoading)

  if (currentUser) {
    navigate('/')
    dispatch(
      showFlashMessageAsync({
        text: `You're signed in as ${currentUser.username}`,
        type: 'success',
      }),
    )
  }

  return (
    <div>
      {currentUserIsLoading ? (
        <Loader />
      ) : (
        <AuthenticationContainer>
          <SignInForm />
          <SignUpForm />
        </AuthenticationContainer>
      )}
    </div>
  )
}

export default Authentication
