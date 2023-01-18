import { useState, useEffect } from "react"
import { useNavigate, Outlet, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { useIsMount } from "../../custom-hooks/use-is-mount"

import { getToken } from "../../utils/helpers/local-storage-manager"
import { selectCurrentUser, selectCurrentUserIsLoading } from "../../store/user/user-selector"
import { fetchCurrentUserAsync } from "../../store/user/user-action"

import {
  showFlashMessageAsync
} from "../../store/flash/flash-action"

import { ROLES_NAME } from "../../utils/api/roles_name"

const ProtectedRoute = () => {
  const isMount = useIsMount()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const currentUserIsLoading = useSelector(selectCurrentUserIsLoading)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = getToken()

    token ? dispatch(fetchCurrentUserAsync()) : forbidAccess()
  }, [])

  useEffect(() => {
    if (isMount) return
  
    if (!currentUserIsLoading) checkUserRole()
  }, [currentUserIsLoading])

  const checkUserRole = () => {
    currentUser?.roles_name.includes(ROLES_NAME.ADMIN_USER) ? setIsAdmin(true) : forbidAccess()
  }

  const forbidAccess = () => {
    dispatch(showFlashMessageAsync("You are not authorized to perform this action"))
    navigate("/")
  }

  return isAdmin ? <Outlet /> : null
}

export default ProtectedRoute

