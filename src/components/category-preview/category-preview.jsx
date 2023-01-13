import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import ProductCard from "../product-card/product-card"
import { getProductsOfCategory } from "../../utils/api/categories"
import { saveToken, getToken } from "../../utils/helpers/local-storage-manager"

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles"

const CategoryPreview = ({ title }) => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const itemsCount = 4
  const page = 1

  useEffect(() => {
    getProductsOfCategory(title, itemsCount, page)
      .then((response) => {
        setProducts(response.data)
      })
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
