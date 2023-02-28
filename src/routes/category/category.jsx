import ProductCard from "../../components/products/product-card/product-card"
import PaginationMaterial from "../../components/inputs/basic-pagination/basic-pagination"
import ItemsCountSelector from "../../components/inputs/items-count-selector/items-count-selector"
import CheckboxesTags from "../../components/inputs/checkboxes-tags/checkboxes-tags"
import { useState, useEffect, Fragment, useRef } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import Loader from "../../components/feedback/loader/loader"

import { getProducts } from "../../utils/api/products"

import {
  CategoryContainer,
  CategoryTitle,
  PaginationBottom,
  PaginationTop,
  FiltersContainer,
} from "./category.styles"

const Category = () => {
  const { category } = useParams()
  const titleElement = useRef()

  const itemsPerPageValues = [20, 50, 100]

  const [urlParams, setUrlParams] = useSearchParams({
    items: itemsPerPageValues[0],
    page: 1,
  })
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(
    itemsPerPageValues[0]
  )
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryExist, setIsCategoryExist] = useState(false)
  const [availableColors, setAvailableColors] = useState([])
  const [availableSizes, setAvailableSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])

  useEffect(() => {
    const nextPage = urlParams.get("page")
    let newItemsPerPage = +urlParams.get("items")
    const colors = urlParams.getAll("color")
    const sizes = urlParams.getAll("size")
    const filters = { color: colors, size: sizes }

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
        setAvailableSizes(response.data.filters.sizes)
        setSelectedColors(colors)
        setSelectedSizes(sizes)
      })
      .catch((error) => {
        // error handling
      })
  }, [urlParams])

  useEffect(() => {
    urlParams.delete("color")
    urlParams.delete("size")
    if (selectedColors.length > 0) {
      selectedColors.forEach((color) => urlParams.append("color", color))
    }
    if (selectedSizes.length > 0) {
      selectedSizes.forEach((size) => urlParams.append("size", size))
    }
    setUrlParams(urlParams, { replace: true })
  }, [selectedColors, selectedSizes])

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
          <FiltersContainer>
            <ItemsCountSelector
              currentItemsPerPage={currentItemsPerPage}
              setItemsPerPage={setItemsPerPage}
              values={itemsPerPageValues}
            />
            <CheckboxesTags
              label="Color"
              options={availableColors}
              selectedOptions={selectedColors}
              setSelectedOptions={setSelectedColors}
            />
            <CheckboxesTags
              label="Size"
              options={availableSizes}
              selectedOptions={selectedSizes}
              setSelectedOptions={setSelectedSizes}
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
        <Loader />
      )}
    </Fragment>
  )
}

export default Category
