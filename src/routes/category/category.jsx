import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/pagination-material/pagination-material"
import ItemsCountSelector from "../../components/items-count-selector/items-count-selector"
import { useState, useEffect, Fragment, useRef } from "react"
<<<<<<< HEAD
import { useParams, useSearchParams } from "react-router-dom"
=======
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
>>>>>>> 2e6d9a6 (add token autorefresh after requests to backend api)

import { getProductsOfCategory } from "../../utils/api/categories"
import { updateUserToken } from "../../store/user/user-action"

import {
  CategoryContainer,
  CategoryTitle,
  PaginationBottom,
  PaginationTop,
} from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const titleElement = useRef()
  const dispatch = useDispatch()

  const itemsPerPageValues = [20, 50, 100]

  const [urlParams, setUrlParams] = useSearchParams()
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPageValues[0])
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const nextPage = urlParams.get("page")
    let newItemsPerPage = +urlParams.get("items")

    if (!itemsPerPageValues.includes(newItemsPerPage)) newItemsPerPage = itemsPerPageValues[0]

    getProductsOfCategory(category, newItemsPerPage, nextPage)
      .then((response) => {
          setProducts(response.data)
          setTotalPages(+response.headers["total-pages"])
          setCurrentPage(+response.headers["current-page"])
          setCurrentItemsPerPage(+response.headers["page-items"])
          setUrlParams({items: +response.headers["page-items"], page: +response.headers["current-page"]})
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [urlParams])

  const setActivePage = (page) => (
    setUrlParams({items: currentItemsPerPage, page: page})
  )

  const setItemsPerPage = (itemsCount) => (
    setUrlParams({items: itemsCount, page: 1})
  )

  return (
    <Fragment>
      <CategoryTitle ref={titleElement}>{category.toUpperCase()}</CategoryTitle>
      <ItemsCountSelector
        currentItemsPerPage={currentItemsPerPage}
        setItemsPerPage={setItemsPerPage}
        values={itemsPerPageValues}
      />
      <PaginationTop>
        <PaginationMaterial
          totalPages={totalPages}
          currentPage={currentPage}
          setActivePage={setActivePage}
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
          setActivePage={setActivePage}
          scrollToRef={titleElement}
        />
      </PaginationBottom>
    </Fragment>
  )
}

export default Category
