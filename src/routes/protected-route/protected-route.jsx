import { useState, useEffect } from "react"
import { useNavigate, Outlet, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { getToken } from "../../utils/helpers/local-storage-manager"
import { selectCurrentUser, selectCurrentUserIsLoading } from "../../store/user/user-selector"

import {
  showFlashMessageAsync
} from "../../store/flash/flash-action"

import { ROLES_NAME } from "../../utils/api/roles_name"

const ProtectedRoute = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const currentUserLoaded = useSelector(selectCurrentUserIsLoading)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = getToken()

    if (token) dispatch(fetchCurrentUserAsync(token))
  }, [])

  useEffect(() => {
    checkUserRole()
  }, [currentUserLoaded])

  const checkUserRole = () => {
    if (currentUser.roles_name.includes(ROLES_NAME.ADMIN_USER)) {
      setIsAdmin(true)
    } else {
      dispatch(showFlashMessageAsync("You are not authorized to perform this action"))
      navigate("/")
    }
  }

  if (!isAdmin) // waiting..
    return null

  return isAdmin ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute

