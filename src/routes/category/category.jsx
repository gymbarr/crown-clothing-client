import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/pagination-material/pagination-material"
import ItemsCountSelector from "../../components/items-count-selector/items-count-selector"
import { useState, useEffect, Fragment, useRef } from "react"
import { useParams } from "react-router-dom"

import { getProductsOfCategory } from "../../utils/api/categories"

import { CategoryContainer, CategoryTitle } from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const titleElement = useRef()

  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getProductsOfCategory(category, itemsPerPage, currentPage)
      .then((response) => {
        setProducts(response.data)
        setTotalPages(+response.headers["total-pages"])
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [currentPage, itemsPerPage])

  return (
    <Fragment>
      <CategoryTitle ref={titleElement}>{category.toUpperCase()}</CategoryTitle>
      <ItemsCountSelector
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
      <PaginationMaterial
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollToRef={titleElement}
      />
    </Fragment>
  )
}

export default Category
