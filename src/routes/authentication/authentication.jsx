import { useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SignInForm from "../../components/users/sign-in-form/sign-in-form"
import SignUpForm from "../../components/users/sign-up-form/sign-up-form"
import Loader from "../../components/feedback/loader/loader"

import {
  selectCurrentUser,
  selectCurrentUserIsLoading,
} from "../../store/user/user-selector"
import { showFlashMessageAsync } from "../../store/flash/flash-action"

import { AuthenticationContainer } from "./authentication.styles"

const Authentication = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const currentUserIsLoading = useSelector(selectCurrentUserIsLoading)

  useEffect(() => {
    if (currentUser) {
      navigate("/")
      dispatch(
        showFlashMessageAsync({
          text: "You're already signed in",
          type: "error",
        })
      )
    }
  }, [currentUserIsLoading])

  return (
    <Fragment>
      {currentUserIsLoading ? (
        <Loader />
      ) : (
        <AuthenticationContainer>
          <SignInForm />
          <SignUpForm />
        </AuthenticationContainer>
      )}
    </Fragment>
  )
}

export default Authentication
