import ProductCard from "../../components/product-card/product-card"
import PaginationMaterial from "../../components/material-ui/pagination-material/pagination-material"
import ItemsCountSelector from "../../components/items-count-selector/items-count-selector"
import CheckboxesTags from "../../components/material-ui/checkboxes-tags-material/checkboxes-tags"
import { useState, useEffect, Fragment, useRef } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { getProducts } from "../../utils/api/products"

import {
  CategoryContainer,
  CategoryTitle,
  PaginationBottom,
  PaginationTop,
  Loader,
  FiltersContainer,
} from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const titleElement = useRef()

  const itemsPerPageValues = [20, 50, 100]

  const [urlParams, setUrlParams] = useSearchParams({ items: itemsPerPageValues[0], page: 1 })
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(
    itemsPerPageValues[0]
  )
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryExist, setIsCategoryExist] = useState(false)
  const [availableColors, setAvailableColors] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  useEffect(() => {
    const nextPage = urlParams.get("page")
    let newItemsPerPage = +urlParams.get("items")
    const colors = urlParams.getAll("color")
    const filters = { color: colors }

    if (!itemsPerPageValues.includes(newItemsPerPage))
      newItemsPerPage = itemsPerPageValues[0]

    getProducts(category, newItemsPerPage, nextPage, filters)
      .then((response) => {
        setIsCategoryExist(true)
        setProducts(response.data.products)
        setTotalPages(+response.headers["total-pages"])
        setCurrentPage(+response.headers["current-page"])
        setCurrentItemsPerPage(+response.headers["page-items"])
        urlParams.set("items", +response.headers["page-items"])
        urlParams.set("page", +response.headers["current-page"])
        setUrlParams(urlParams, { replace: true })
        setAvailableColors(response.data.filters.colors)
        setSelectedColors(colors)
      })
      .catch((error) => {
        // error handling
      })
  }, [urlParams])

  useEffect(() => {
    urlParams.delete("color")
    if (selectedColors.length > 0) {
      selectedColors.forEach(color => urlParams.append("color", color))
    }
    setUrlParams(urlParams, { replace: true })
  }, [selectedColors])

  const setActivePage = (page) => {
    urlParams.set("page", page)
    setUrlParams(urlParams)
  }

  const setItemsPerPage = (itemsCount) => {
    urlParams.set("items", itemsCount)
    urlParams.set("page", 1)
    setUrlParams(urlParams, { replace: true })
  }

  return (
    <Fragment>
      {isCategoryExist ? (
        <Fragment>
          <CategoryTitle ref={titleElement}>
            {category.toUpperCase()}
          </CategoryTitle>
          <ItemsCountSelector
            currentItemsPerPage={currentItemsPerPage}
            setItemsPerPage={setItemsPerPage}
            values={itemsPerPageValues}
          />
          <FiltersContainer>
            <CheckboxesTags
              label="Color"
              options={availableColors}
              selectedOptions={selectedColors}
              setSelectedOptions={setSelectedColors}
            />
          </FiltersContainer>
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
