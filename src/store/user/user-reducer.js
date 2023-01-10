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
      payload
        ? localStorage.setItem("token", JSON.stringify(payload.token))
        : localStorage.removeItem("token")

      return {
        ...state,
        currentUser: payload,
      }
    case USER_ACTION_TYPES.UPDATE_USER_TOKEN:
      payload
        ? localStorage.setItem("token", JSON.stringify(payload))
        : localStorage.removeItem("token")

      return {
        ...state,
        currentUser: { ...state.currentUser, token: payload },
      }
    case USER_ACTION_TYPES.FETCH_CURRENT_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case USER_ACTION_TYPES.FETCH_CURRENT_USER_SUCCESS:
      payload
        ? localStorage.setItem("token", JSON.stringify(payload.token))
        : localStorage.removeItem("token")

      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      }
    case USER_ACTION_TYPES.FETCH_CURRENT_USER_FAILURE:
      localStorage.removeItem("token")

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
