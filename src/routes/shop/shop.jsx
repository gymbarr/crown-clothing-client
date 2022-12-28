import { Routes, Route } from "react-router-dom"

import Category from "../category/category"

const Shop = () => {
  return (
    <Routes>
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop
