import { USER_ACTION_TYPES } from "./user-types"
import { createAction } from "../../utils/reducer/reducer"
import { getCurrentUser } from "../../utils/api/users"

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

export const updateUserToken = (token) =>
  createAction(USER_ACTION_TYPES.UPDATE_USER_TOKEN, token)

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
        const userData = {
          ...response.data,
          token: response.headers.token,
        }
        dispatch(fetchCurrentUserSuccess(userData))
      })
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error))
  }
}

export const toggleDropdownVisible = () =>
  createAction(USER_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE)