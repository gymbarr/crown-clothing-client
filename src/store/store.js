import { configureStore } from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import thunk from "redux-thunk"


import { rootReducer } from "./root-reducer"

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean)

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
})
