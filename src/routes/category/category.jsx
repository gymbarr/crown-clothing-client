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
  const [isCategoryExist, setIsCategoryExist] = useState(false)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [responseResult, setResponseResult] = useState({})

  const products = responseResult.data?.products
  const totalPages = +responseResult.headers?.["total-pages"] ?? 1
  const availableColors = responseResult.data?.filters.colors
  const availableSizes = responseResult.data?.filters.sizes
  const currentPage = +responseResult.headers?.["current-page"] ?? 1
  const currentItemsPerPage = +responseResult.headers?.["page-items"] ?? itemsPerPageValues[0]

  useEffect(() => {
    getProductsWithUrlParams()
  }, [])

  const getProductsWithUrlParams = () => {
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
        urlParams.set("items", +response.headers["page-items"])
        urlParams.set("page", +response.headers["current-page"])
        setUrlParams(urlParams, { replace: true })
        setResponseResult(response)
      })
      .catch((error) => {
        // error handling
      })
  }

  const handleOnSelectColors = (selectedColors) => {
    setSelectedColors(selectedColors)
    urlParams.delete("color")

    if (selectedColors.length > 0) {
      selectedColors.forEach((color) => urlParams.append("color", color))
    }

    setUrlParams(urlParams, { replace: true })
    getProductsWithUrlParams()
  }

  const handleOnSelectSizes = (selectedSizes) => {
    setSelectedSizes(selectedSizes)
    urlParams.delete("size")

    if (selectedSizes.length > 0) {
      selectedSizes.forEach((size) => urlParams.append("size", size))
    }

    setUrlParams(urlParams, { replace: true })
    getProductsWithUrlParams()
  }

  const handleOnChangePage = (page) => {
    urlParams.set("page", page)
    setUrlParams(urlParams)
    window.scrollTo({ behavior: 'smooth', top: titleElement.current.offsetTop })
    getProductsWithUrlParams()
  }

  const handleOnChangeItemsPerPage = (itemsCount) => {
    urlParams.set("items", itemsCount)
    urlParams.set("page", 1)
    setUrlParams(urlParams, { replace: true })
    getProductsWithUrlParams()
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
              handleOnChange={handleOnChangeItemsPerPage}
              values={itemsPerPageValues}
            />
            <CheckboxesTags
              label="Color"
              options={availableColors}
              selectedOptions={selectedColors}
              handleOnChange={handleOnSelectColors}
            />
            <CheckboxesTags
              label="Size"
              options={availableSizes}
              selectedOptions={selectedSizes}
              handleOnChange={handleOnSelectSizes}
            />
          </FiltersContainer>
          <PaginationTop>
            <PaginationMaterial
              totalPages={totalPages}
              currentPage={currentPage}
              handleOnChange={handleOnChangePage}
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
              handleOnChange={handleOnChangePage}
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
