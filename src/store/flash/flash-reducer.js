import { FLASH_ACTION_TYPES } from "./flash-types"

const INITIAL_STATE = {
  messages: [],
}

export const flashReducer = (state = INITIAL_STATE, action) => {
  const { type, payload: newMessage } = action
  const messages = state.messages

  switch (type) {
    case FLASH_ACTION_TYPES.PUSH_MESSAGE:
      return {
        ...state,
        messages: [...messages, newMessage],
      }
    case FLASH_ACTION_TYPES.SHIFT_MESSAGES:
      return {
        ...state,
        messages: messages.slice(1),
      }
    default:
      return state
  }
}
