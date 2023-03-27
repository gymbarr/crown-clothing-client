import { useState, useEffect } from 'react'
import { OutlinedInput, IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import InfiniteScroll from 'react-infinite-scroll-component'
import CloseIcon from '../../icons/close-icon/close-icon'
import SearchBoxCategoryItem from '../search-box-category-item/search-box-category-item'
import SearchBoxProductItem from '../search-box-product-item/search-box-product-item'
import BasicSwitch from '../../inputs/basic-switch/basic-switch'
import Loader from '../../feedback/loader/loader'
import { getSearchResults } from '../../../utils/api/search'

import {
  SearchInputContainer,
  ItemsContainer,
  NothingFoundText,
  SearchDetailsContainer,
  SwitchLabel,
  ResponseTimeTitle,
} from './search-box.styles'

function SearchBox(props) {
  const { isOpened, setIsOpened } = props
  const [searchInput, setSearchInput] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [searchMethod, setSearchMethod] = useState('pg')
  const [searchResponseTime, setSearchResponseTime] = useState(0)
  let searchInputTimerId

  const getMoreSearchResults = (nextPageNum = 1) => {
    if (!(searchInput.length > 0)) return

    getSearchResults(searchInput, nextPageNum, searchMethod)
      .then((response) => {
        nextPageNum > 1
          ? setProducts(products.concat(response.data.products))
          : setProducts(response.data.products)
        setCategories(response.data.categories)
        setNextPage(response.data.pagy.next)
        setSearchResponseTime(response.data.performance)
      })
      .catch(() => {
        // error handling
      })
  }

  const handleClose = () => {
    setIsOpened(false)
    setSearchInput('')
    setCategories([])
    setProducts([])
    setSearchMethod('pg')
    setSearchResponseTime(0)
  }

  const handleOnSearchChange = (event) => {
    if (searchInputTimerId) clearTimeout(searchInputTimerId)
    searchInputTimerId = setTimeout(() => setSearchInput(event.target.value), 500)
  }

  const handleSwitchSearchMethod = () => {
    searchMethod === 'pg' ? setSearchMethod('elastic') : setSearchMethod('pg')
    setCategories([])
    setProducts([])
    setSearchResponseTime(0)
  }

  useEffect(() => {
    if (searchInput.length > 0) {
      getMoreSearchResults()
    } else {
      setCategories([])
      setProducts([])
    }
  }, [searchInput, searchMethod])

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>
        <SearchInputContainer>
          <OutlinedInput
            onChange={handleOnSearchChange}
            placeholder="Please enter text"
            fullWidth
          />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </SearchInputContainer>
      </DialogTitle>
      <DialogContent id="scrollableDiv" dividers>
        <InfiniteScroll
          dataLength={products.length} // This is important field to render the next data
          next={() => getMoreSearchResults(nextPage)}
          hasMore={nextPage}
          scrollableTarget="scrollableDiv"
          height={520}
          loader={searchInput && nextPage && <Loader />}
        >
          <ItemsContainer>
            {categories.length > 0
              ? categories.map((category) => (
                <SearchBoxCategoryItem
                  key={category.id}
                  category={category}
                  handleCloseDialog={handleClose}
                />
              ))
              : null}
            {products.length > 0
              ? products.map((product) => (
                <SearchBoxProductItem
                  key={product.id}
                  product={product}
                  handleCloseDialog={handleClose}
                />
              ))
              : null}
            {categories.length === 0 && products.length === 0 && (
            <NothingFoundText>Nothing was found...</NothingFoundText>
            )}
          </ItemsContainer>
        </InfiniteScroll>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'start' }}>
        <SearchDetailsContainer>
          <SwitchLabel>Search method: </SwitchLabel>
          <BasicSwitch
            leftLabel="PG"
            rightLabel="Elastic"
            handleOnSwitch={handleSwitchSearchMethod}
          />
          <ResponseTimeTitle>
            Response time:
            {' '}
            {searchResponseTime}
            {' '}
            ms
          </ResponseTimeTitle>
        </SearchDetailsContainer>
      </DialogActions>
    </Dialog>
  )
}

export default SearchBox
