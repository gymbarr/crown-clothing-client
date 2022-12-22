import { USER_ACTION_TYPES } from './user-types'
import { createAction } from "../../utils/reducer/reducer"

export const setCurrentUser = (user) => 
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

  export const toggleDropdownVisible = (boolean) => {
    return createAction(USER_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE, boolean)
  }
