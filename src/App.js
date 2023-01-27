import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import Home from "./routes/home/home"
import Navigation from "./routes/navigation/navigation"
import Shop from "./routes/shop/shop"
import Authentication from "./routes/authentication/authentication"
import Administration from "./routes/administration/administration"
import Checkout from "./routes/checkout/checkout"
import NotFound from "./components/not-found/not-found"

import { fetchCurrentUserAsync } from "./store/user/user-action"
import { loadCartState } from "./utils/helpers/local-storage-manager"
import { setCartState } from "./store/cart/cart-action"


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUserAsync())

    const savedCartState = loadCartState()

    if (savedCartState) {
      dispatch(setCartState(savedCartState))
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="admin" element={<Administration />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='not_found' element={<NotFound />}/>
        <Route path='*' element={<Navigate to="not_found" />}/>
      </Route>
    </Routes>
  )
}

export default App
