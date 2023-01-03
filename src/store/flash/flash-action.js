import { FLASH_ACTION_TYPES } from "./flash-types"
import { createAction } from "../../utils/reducer/reducer"

export const addFlashMessage = (message) => 
  createAction(FLASH_ACTION_TYPES.PUSH_MESSAGE, message)

export const removeFlashMessage = () => 
  createAction(FLASH_ACTION_TYPES.SHIFT_MESSAGE)
