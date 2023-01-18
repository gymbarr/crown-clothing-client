import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Home from "./routes/home/home"
import Navigation from "./routes/navigation/navigation"
import Shop from "./routes/shop/shop"
import Authentication from "./routes/authentication/authentication"
import ProtectedRoute from "./routes/protected-route/protected-route"
import Administration from "./routes/administration/administration"

import { fetchCurrentUserAsync } from "./store/user/user-action"


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUserAsync())
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<Administration />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
