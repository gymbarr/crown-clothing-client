import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/pagination-material/pagination-material"
import ItemsCountSelector from "../../components/items-count-selector/items-count-selector"
import { useState, useEffect, Fragment, useRef } from "react"
import { useParams } from "react-router-dom"

import { getProductsOfCategory } from "../../utils/api/categories"

import {
  CategoryContainer,
  CategoryTitle,
  PaginationBottom,
  PaginationTop,
} from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const titleElement = useRef()

  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPage, setNextPage] = useState(null)

  useEffect(() => {
    const currPage = currentPage

    getProductsOfCategory(category, itemsPerPage, currPage, nextPage)
      .then((response) => {
        if (currPage === currentPage) { 
          setProducts(response.data)
          setTotalPages(+response.headers["total-pages"])
          setCurrentPage(+response.headers["current-page"])
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [nextPage, itemsPerPage])

  return (
    <Fragment>
      <CategoryTitle ref={titleElement}>{category.toUpperCase()}</CategoryTitle>
      <ItemsCountSelector
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <PaginationTop>
        <PaginationMaterial
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setNextPage}
        />
      </PaginationTop>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
      <PaginationBottom>
        <PaginationMaterial
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setNextPage}
          scrollToRef={titleElement}
        />
      </PaginationBottom>
    </Fragment>
  )
}

export default Category
