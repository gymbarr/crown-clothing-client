import { useState, useEffect } from 'react'
import { getCategories } from '../../utils/api/categories'

import CategoryPreview from '../../components/categories/category-preview/category-preview'

function CategoriesPreview() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data)
      })
      .catch(() => {
        // error handling
      })
  }, [])

  return (
    <>
      {categories.map((category) => (
        <CategoryPreview key={category.id} title={category.title} />
      ))}
    </>
  )
}

export default CategoriesPreview
