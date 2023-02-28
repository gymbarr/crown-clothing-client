import { useState, useEffect, Fragment } from "react"
import CategoryItem from "../category-item/category-item"
import Loader from "../../feedback/loader/loader"

import { getCategories } from "../../../utils/api/categories"

import { CategoryContainer } from "./category.styles"

const Category = () => {
  const [categories, setCategories] = useState([])
  const [imgsLoaded, setImgsLoaded] = useState(false)

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        // error handling
      })
  }, [])

  useEffect(() => {
    if (categories.length == 0) return
    
    const loadImage = imageUrl => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = imageUrl
        loadImg.onload = () => resolve()
        loadImg.onerror = err => reject(err)
      })
    }

    Promise.all(categories.map(category => loadImage(category.imageUrl)))
      .then(() => setImgsLoaded(true))
      .catch(err => console.log("Failed to load images", err))
  }, [categories])

  return (
    <Fragment>
      {imgsLoaded ? (
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
