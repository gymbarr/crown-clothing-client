import { USER_ACTION_TYPES } from "./user-types"

const INITIAL_STATE = {
  currentUser: null,
  dropdownVisible: false,
  isLoading: false,
  error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    case USER_ACTION_TYPES.FETCH_CURRENT_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case USER_ACTION_TYPES.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      }
    case USER_ACTION_TYPES.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        currentUser: null,
      }
    case USER_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE:
      return {
        ...state,
        dropdownVisible: !state.dropdownVisible,
      }
    default:
      return state
  }
}
