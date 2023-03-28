import { Outlet } from 'react-router-dom'

import Directory from '../../components/categories/category/category'

const Home = () => (
  <div>
    <Directory />
    <Outlet />
  </div>
)

export default Home
