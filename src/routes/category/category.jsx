import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/pagination-material/pagination-material"
import { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"

import { getProductsOfCategory } from "../../utils/api/categories"

import { CategoryContainer, CategoryTitle } from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const itemsPerPage = 20
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {
    getProductsOfCategory(category, itemsPerPage, activePage)
      .then((response) => {
        setProducts(response.data)
        setCurrentPage(+response.headers["current-page"])
        setTotalPages(+response.headers["total-pages"])
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [activePage])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
      <PaginationMaterial totalPages={totalPages} currentPage={currentPage} setActivePage={setActivePage} />
    </Fragment>
  )
}

export default Category
