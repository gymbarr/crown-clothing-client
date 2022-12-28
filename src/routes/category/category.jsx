import ProductCard from "../../components/product-card/product-card"
import { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"

import { getProductsOfCategory } from "../../utils/api/categories"

import { CategoryContainer, CategoryTitle } from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProductsOfCategory(category)
      .then((response) => response.data)
      .then((products) => setProducts(products))
      .catch((error) => {
        // showFlashMessage(error.message)
        alert(error.message)
      })
  }, [])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  )
}

export default Category
