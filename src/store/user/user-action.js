import USER_ACTION_TYPES from './user-types'
// eslint-disable-next-line import/no-cycle
import { getCurrentUser } from '../../utils/api/users'
import { createAction } from '../../utils/reducer/reducer'

export const setCurrentUser = (user) => (
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
)

export const fetchCurrentUserStart = () => (
  createAction(USER_ACTION_TYPES.FETCH_CURRENT_USER_START)
)

export const fetchCurrentUserSuccess = (user) => (
  createAction(USER_ACTION_TYPES.FETCH_CURRENT_USER_SUCCESS, user)
)

export const fetchCurrentUserFailure = () => (
  createAction(USER_ACTION_TYPES.FETCH_CURRENT_USER_FAILURE)
)

export const fetchCurrentUserAsync = () => async (dispatch) => {
  dispatch(fetchCurrentUserStart())

  try {
    await getCurrentUser().then((response) => {
      dispatch(fetchCurrentUserSuccess(response.data))
    })
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error))
  }
}
