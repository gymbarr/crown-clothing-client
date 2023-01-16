import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from './routes/home/home'
import Navigation from './routes/navigation/navigation'
import Shop from './routes/shop/shop'
import Authentication from './routes/authentication/authentication'
import ProtectedRoute from './routes/protected-route/protected-route'
import Administration from './routes/administration/administration'

import { fetchCurrentUserAsync } from "./store/user/user-action"

export let history = createBrowserHistory()

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUserAsync())
  }, [])

  return (
    <HistoryRouter history={history}>
      {/* <Routes> */}
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route element={<ProtectedRoute />}>
            <Route path='admin' element={<Administration />} />
          </Route>
        </Route>
      {/* </Routes> */}
    </HistoryRouter>
  )
}

export default App
