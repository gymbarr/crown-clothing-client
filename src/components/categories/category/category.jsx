import { useState, useEffect, Fragment } from "react"
import { useImagesPreloader } from "../../../custom-hooks/use-images-preloader"
import CategoryItem from "../category-item/category-item"
import Loader from "../../feedback/loader/loader"

import { getCategories } from "../../../utils/api/categories"

import { CategoryContainer } from "./category.styles"

const Category = () => {
  const [categories, setCategories] = useState([])
  const imagesUrls = categories.map(category => category.imageUrl)
  const isImagesLoaded = useImagesPreloader(imagesUrls)

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
      {isImagesLoaded ? (
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </CategoryContainer>
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default Category
