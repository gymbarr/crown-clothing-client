import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/pagination-material/pagination-material"
import ItemsCountSelector from "../../components/items-count-selector/items-count-selector"
import { useState, useEffect, Fragment, useRef } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { getProductsOfCategory } from "../../utils/api/categories"

import {
  CategoryContainer,
  CategoryTitle,
  PaginationBottom,
  PaginationTop,
  Loader,
} from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const titleElement = useRef()

  const itemsPerPageValues = [20, 50, 100]

  const [urlParams, setUrlParams] = useSearchParams({ items: 20, page: 1 })
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPageValues[0])
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryExist, setIsCategoryExist] = useState(false)

  useEffect(() => {
    const nextPage = urlParams.get("page")
    let newItemsPerPage = +urlParams.get("items")

    if (!itemsPerPageValues.includes(newItemsPerPage)) newItemsPerPage = itemsPerPageValues[0]

    getProductsOfCategory(category, newItemsPerPage, nextPage)
      .then((response) => {
        setIsCategoryExist(true)
        setProducts(response.data)
        setTotalPages(+response.headers["total-pages"])
        setCurrentPage(+response.headers["current-page"])
        setCurrentItemsPerPage(+response.headers["page-items"])
        setUrlParams({items: +response.headers["page-items"], page: +response.headers["current-page"]}, { replace: true })
      })
      .catch((error) => {
        // error handling
      })
  }, [urlParams])

  const setActivePage = (page) => (
    setUrlParams({items: currentItemsPerPage, page: page}, { replace: true })
  )

  const setItemsPerPage = (itemsCount) => (
    setUrlParams({items: itemsCount, page: 1}, { replace: true })
  )

  return (
    <Fragment>
      {isCategoryExist ? (
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
      ) : (
         <Loader>
           <CircularProgress color="inherit" />
         </Loader>
       )}
    </Fragment>
  )
}

export default Category
