import { useState, useEffect } from 'react'
import useImagesPreloader from '../../../custom-hooks/use-images-preloader'
import CategoryItem from '../category-item/category-item'
import Loader from '../../feedback/loader/loader'

import { getCategories } from '../../../utils/api/categories'

import CategoryContainer from './category.styles'

function Category() {
  const [categories, setCategories] = useState([])
  const imagesUrls = categories.map((category) => category.imageUrl)
  const isImagesLoaded = useImagesPreloader(imagesUrls)

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
    <div>
      {isImagesLoaded ? (
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </CategoryContainer>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Category
