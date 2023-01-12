import { useState, useEffect, Fragment } from "react"

import { getCategories } from "../../utils/api/categories"
import { saveToken, getToken } from "../../utils/helpers/local-storage-manager"

import CategoryPreview from "../../components/category-preview/category-preview"

const CategoriesPreview = () => {
  const [categories, setCategories] = useState([])
  const token = getToken()

  useEffect(() => {
    getCategories(token)
      .then((response) => {
        setCategories(response.data)
        saveToken(response.headers.token)
      })
      .catch((error) => {
        alert(error.message)
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
