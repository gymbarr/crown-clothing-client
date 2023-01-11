import { USER_ACTION_TYPES } from "./user-types"
import { createAction } from "../../utils/reducer/reducer"
import { getCurrentUser } from "../../utils/api/users"
import { saveToken } from "../../utils/helpers/local-storage-manager"

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

export const fetchCurrentUserStart = () =>
  createAction(USER_ACTION_TYPES.FETCH_CURRENT_USER_START)

export const fetchCurrentUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.FETCH_CURRENT_USER_SUCCESS, user)

export const fetchCurrentUserFailure = () =>
  createAction(USER_ACTION_TYPES.FETCH_CURRENT_USER_FAILURE)

export const fetchCurrentUserAsync = (token) => async (dispatch) => {
  dispatch(fetchCurrentUserStart())

  try {
    await getCurrentUser(token)
      .then((response) => {
        dispatch(fetchCurrentUserSuccess(response.data))
        saveToken(response.headers.token)
      })
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error))
  }
}

export const toggleDropdownVisible = () =>
  createAction(USER_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE)