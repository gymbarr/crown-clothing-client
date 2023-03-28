import {
  useState, useEffect, useRef,
} from 'react'

import { useParams, useSearchParams } from 'react-router-dom'

import {
  CategoryContainer,
  CategoryTitle,
  PaginationBottom,
  PaginationTop,
  FiltersContainer,
} from './category.styles'
import Loader from '../../components/feedback/loader/loader'
import PaginationMaterial from '../../components/inputs/basic-pagination/basic-pagination'
import CheckboxesTags from '../../components/inputs/checkboxes-tags/checkboxes-tags'
import ItemsCountSelector from '../../components/inputs/items-count-selector/items-count-selector'
import ProductCard from '../../components/products/product-card/product-card'
import { getProducts } from '../../utils/api/products'

function Category() {
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
  const totalPages = +responseResult.headers?.['total-pages'] ?? 1
  const availableColors = responseResult.data?.filters.colors
  const availableSizes = responseResult.data?.filters.sizes
  const currentPage = +responseResult.headers?.['current-page'] ?? 1
  const currentItemsPerPage = +responseResult.headers?.['page-items'] ?? itemsPerPageValues[0]

  const getProductsWithUrlParams = () => {
    const nextPage = urlParams.get('page')
    let newItemsPerPage = +urlParams.get('items')
    const colors = urlParams.getAll('color')
    const sizes = urlParams.getAll('size')
    const filters = { color: colors, size: sizes }

    if (!itemsPerPageValues.includes(newItemsPerPage)) newItemsPerPage = itemsPerPageValues[0]

    getProducts(category, newItemsPerPage, nextPage, filters)
      .then((response) => {
        setIsCategoryExist(true)
        urlParams.set('items', +response.headers['page-items'])
        urlParams.set('page', +response.headers['current-page'])
        setUrlParams(urlParams, { replace: true })
        setResponseResult(response)
      })
      .catch(() => {
        // error handling
      })
  }

  const handleOnSelectColors = (pickedColors) => {
    setSelectedColors(pickedColors)
    urlParams.delete('color')

    if (pickedColors.length > 0) {
      pickedColors.forEach((color) => urlParams.append('color', color))
    }

    setUrlParams(urlParams, { replace: true })
    getProductsWithUrlParams()
  }

  const handleOnSelectSizes = (pickedSizes) => {
    setSelectedSizes(pickedSizes)
    urlParams.delete('size')

    if (pickedSizes.length > 0) {
      pickedSizes.forEach((size) => urlParams.append('size', size))
    }

    setUrlParams(urlParams, { replace: true })
    getProductsWithUrlParams()
  }

  const handleOnChangePage = (page) => {
    urlParams.set('page', page)
    setUrlParams(urlParams)
    window.scrollTo({ behavior: 'smooth', top: titleElement.current.offsetTop })
    getProductsWithUrlParams()
  }

  const handleOnChangeItemsPerPage = (itemsCount) => {
    urlParams.set('items', itemsCount)
    urlParams.set('page', 1)
    setUrlParams(urlParams, { replace: true })
    getProductsWithUrlParams()
  }

  useEffect(() => {
    getProductsWithUrlParams()
  }, [])

  return (
    <div>
      {isCategoryExist ? (
        <>
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
            {products
              && products.map((product) => (
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Category
