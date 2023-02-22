import { useState, useEffect } from "react"
import CategoryItem from "../category-item/category-item"

import { getCategories } from "../../../utils/api/categories"

import { CategoryContainer } from "./category.styles"

const Category = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        // error handling
      })
  }, [])

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </CategoryContainer>
  )
}

export default Category
