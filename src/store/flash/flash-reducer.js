import FLASH_ACTION_TYPES from './flash-types'

const INITIAL_STATE = {
  messages: [],
}

// eslint-disable-next-line default-param-last
const flashReducer = (state = INITIAL_STATE, action) => {
  const { type, payload: newMessage } = action
  const { messages } = state

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

export default flashReducer
