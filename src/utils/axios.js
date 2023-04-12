import axios from 'axios'
import Qs from 'qs'

import {
  loadToken,
  saveToken,
  removeToken,
} from './helpers/local-storage-manager'
import History from './history'
import { showFlashMessageAsync } from '../store/flash/flash-action'
import store from '../store/store'
import { setCurrentUser } from '../store/user/user-action'

export const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'No-Cache',
  },
  paramsSerializer: {
    serialize: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  },
})

apiRequest.interceptors.request.use(
  (config) => {
    const token = loadToken()

    if (token) config.headers.Authorization = token

    return config
  },
  (error) => Promise.reject(error),
)

apiRequest.interceptors.response.use(
  (response) => {
    const { token } = response.headers

    if (token) {
      saveToken(token)
    } else {
      const user = store.getState().user.currentUser

      removeToken()
      if (user) store.dispatch(setCurrentUser(null))
    }

    return response
  },
  async (error) => {
    const message = error.response.data.errors
    const { status } = error.response

    if (status === 401) {
      switch (message) {
        case 'You are not authorized to perform this action':
          History.push('/')
          break
        case 'Signature has expired':
        case 'Not enough or too many segments':
        case 'Signature verification failed':
          removeToken()
          store.dispatch(setCurrentUser(null))
          History.push('/auth')
          break
        default:
          History.push('/')
      }
    }

    if (status === 404) {
      History.push('/not_found')
      return
    }

    store.dispatch(showFlashMessageAsync({ text: message, type: 'error' }))

    // eslint-disable-next-line consistent-return
    return Promise.reject(error)
  },
)
