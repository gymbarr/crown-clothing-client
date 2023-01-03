import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/pagination-material/pagination-material"
import { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"

import { getProductsOfCategory } from "../../utils/api/categories"

import { CategoryContainer, CategoryTitle, PaginationContainer } from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProductsOfCategory(category)
      .then((response) => response.data)
      .then((products) => setProducts(products))
      .catch((error) => {
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
      <PaginationMaterial />
    </Fragment>
  )
}

export default Category
