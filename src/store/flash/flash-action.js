import { FLASH_ACTION_TYPES } from "./flash-types"
import { createAction } from "../../utils/reducer/reducer"

export const pushFlashMessage = (message) => 
  createAction(FLASH_ACTION_TYPES.PUSH_MESSAGE, message)

export const shiftFlashMessages = () => 
  createAction(FLASH_ACTION_TYPES.SHIFT_MESSAGES)


export const showFlashMessageAsync = (message) => async (dispatch) => {
  dispatch(pushFlashMessage(message))

  setTimeout(() => {
    dispatch(shiftFlashMessages())
  }, 3000)
}
