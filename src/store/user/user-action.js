import { USER_ACTION_TYPES } from "./user-types"
import { createAction } from "../../utils/reducer/reducer"
import { getUser } from "../../utils/api/users"

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

export const fetchUserStart = () =>
  createAction(USER_ACTION_TYPES.FETCH_USER_START)

export const fetchUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, user)

export const fetchUserFailure = () =>
  createAction(USER_ACTION_TYPES.FETCH_USER_FAILURE)

export const fetchUserAsync = (username, token) => async (dispatch) => {
  dispatch(fetchUserStart())

  try {
    await getUser(username, token)
      .then((response) => {
        const userData = {
          ...response.data,
          token: response.headers.token,
        }
        dispatch(fetchUserSuccess(userData))
      })
  } catch (error) {
    dispatch(fetchUserFailure(error))
  }
}

export const toggleDropdownVisible = () =>
  createAction(USER_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE)