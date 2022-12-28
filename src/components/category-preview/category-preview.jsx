import { useState, useEffect } from "react"

import ProductCard from "../product-card/product-card"
import { getProductsOfCategory } from "../../utils/api/categories"

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles"

const CategoryPreview = ({ title }) => {
  const [products, setProducts] = useState([])
  const itemsCount = 4

  useEffect(() => {
    getProductsOfCategory(title, itemsCount)
      .then((response) => response.data)
      .then((products) => setProducts(products))
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title className="title" to={title}>
          {title.toUpperCase()}
        </Title>
      </h2>
      <Preview>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
