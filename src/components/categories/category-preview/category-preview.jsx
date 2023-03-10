import { useState, useEffect } from "react"

import ProductCard from "../../products/product-card/product-card"
import { getProducts } from "../../../utils/api/products"

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles"

const CategoryPreview = ({ title: category }) => {
  const [products, setProducts] = useState([])
  const itemsCount = 4
  const page = 1

  useEffect(() => {
    getProducts(category, itemsCount, page)
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        // error handling
      })
  }, [])

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title className="title" to={category}>
          {category.toUpperCase()}
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
