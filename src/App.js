import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'

import Home from './routes/home/home'
import Navigation from './routes/navigation/navigation'
import Authentication from './routes/authentication/authentication'
import Administration from './routes/administration/administration'

import { setCurrentUser } from "./store/user/user-action"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    
    if (token && username) {
      const user = { username: username, token: token }
      dispatch(setCurrentUser(user))
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='admin' element={<Administration />} />
      </Route>
    </Routes>
  )
}

export default App
