import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import Home from "./routes/home/home"
import Navigation from "./routes/navigation/navigation"
import Shop from "./routes/shop/shop"
import Authentication from "./routes/authentication/authentication"
import Administration from "./routes/administration/administration"
import NotFound from "./components/not-found/not-found"

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
        <Route path="admin" element={<Administration />} />
        <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default App
