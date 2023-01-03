import { useState, useEffect, Fragment } from "react"

import { getCategories } from "../../utils/api/categories"

import CategoryPreview from "../../components/category-preview/category-preview"

const CategoriesPreview = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((response) => response.data)
      .then((categories) => setCategories(categories))
      .catch((error) => {
        // alert(error.message)
      })
  }, [])

  return (
    <Fragment>
      {categories.map((category) => (
        <CategoryPreview key={category.id} title={category.title} />
      ))}
    </Fragment>
  )
}

export default CategoriesPreview
