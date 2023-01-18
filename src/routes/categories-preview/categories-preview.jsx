import { useState, useEffect, Fragment } from "react"
import { useDispatch } from "react-redux"
import { getCategories } from "../../utils/api/categories"
import { showFlashMessageAsync } from "../../store/flash/flash-action"

import CategoryPreview from "../../components/category-preview/category-preview"

const CategoriesPreview = () => {
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
    <Fragment>
      {categories.map((category) => (
        <CategoryPreview key={category.id} title={category.title} />
      ))}
    </Fragment>
  )
}

export default CategoriesPreview
