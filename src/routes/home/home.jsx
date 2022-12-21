import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user-selector"

import Directory from "../../components/directory/directory"

const Home = () => {
  const user = useSelector(selectCurrentUser)

  console.log(user)
  
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  )
}

export default Home
