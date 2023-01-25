import { Routes, Route } from "react-router-dom"

import CategoriesPreview from "../categories-preview/categories-preview"
import Category from "../category/category"
import Product from "../product/product"

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
      <Route path=":productCategory/products/:productId" element={<Product />} />
    </Routes>
  )
}

export default Shop
