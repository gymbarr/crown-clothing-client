import { useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SignInForm from "../../components/sign-in-form/sign-in-form"
import SignUpForm from "../../components/sign-up-form/sign-up-form"
import { CircularProgress } from "@mui/material"

import {
  selectCurrentUser,
  selectCurrentUserIsLoading,
} from "../../store/user/user-selector"
import { showFlashMessageAsync } from "../../store/flash/flash-action"

import { AuthenticationContainer, Loader } from "./authentication.styles"

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
        <Loader>
          <CircularProgress color="inherit" />
        </Loader>
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
