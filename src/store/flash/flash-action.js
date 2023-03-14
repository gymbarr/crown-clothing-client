import { FLASH_ACTION_TYPES } from "./flash-types"
import { createAction } from "../../utils/reducer/reducer"
import store from "../store"

export const pushFlashMessage = (message) => 
  createAction(FLASH_ACTION_TYPES.PUSH_MESSAGE, message)

export const shiftFlashMessages = () => 
  createAction(FLASH_ACTION_TYPES.SHIFT_MESSAGES)


export const showFlashMessageAsync = (message) => async (dispatch) => {
  const messages = store.getState().flash.messages
  const messagesTexts = messages.map(message => message.text[0])

  if (messagesTexts.includes(message.text[0])) return

  dispatch(pushFlashMessage(message))

  setTimeout(() => {
    dispatch(shiftFlashMessages())
  }, 3000)
}
