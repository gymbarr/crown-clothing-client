import { useState, useEffect, Fragment } from "react"
import { useDebounce } from "use-debounce"
import { OutlinedInput } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import { IconButton } from "@mui/material"
import CloseIcon from "../../icons/close-icon/close-icon"
import SearchBoxCategoryItem from "../search-box-category-item/search-box-category-item"
import SearchBoxProductItem from "../search-box-product-item/search-box-product-item"
import InfiniteScroll from "react-infinite-scroll-component"
import BasicSwitch from "../../inputs/basic-switch/basic-switch"
import { CircularProgress } from "@mui/material"
import { getSearchResults } from "../../../utils/api/search"

import {
  SearchInputContainer,
  ItemsContainer,
  NothingFoundText,
  Loader,
  SearchDetailsContainer,
  SwitchLabel,
  ResponseTimeTitle,
} from "./search-box.styles"

const SearchBox = (props) => {
  const { isOpened, setIsOpened } = props
  const [searchInput, setSearchInput] = useState("")
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [searchMethod, setSearchMethod] = useState("pg")
  const [searchResponseTime, setSearchResponseTime] = useState(0)
  const [debounceValue] = useDebounce(searchInput, 400)

  useEffect(() => {
    setNextPage(1)
    if (searchInput.length > 0) {
      getMoreSearchResults()
    } else {
      setCategories([])
      setProducts([])
    }
  }, [debounceValue, searchMethod])

  const getMoreSearchResults = (nextPage = 1) => {
    if (!(searchInput.length > 0)) return
    
    getSearchResults(searchInput, nextPage, searchMethod)
      .then((response) => {
        nextPage > 1
          ? setProducts(products.concat(response.data.products))
          : setProducts(response.data.products)
        setCategories(response.data.categories)
        setNextPage(response.data.pagy.next)
        setSearchResponseTime(response.data.performance)
      })
      .catch((error) => {
        // error handling
      })
  }

  const handleClose = () => {
    setIsOpened(false)
    setSearchInput("")
    setCategories([])
    setProducts([])
    setSearchMethod("pg")
    setSearchResponseTime(0)
  }

  const handleOnSearchChange = (event) => setSearchInput(event.target.value)

  const handleSwitchSearchMethod = () => {
    searchMethod == "pg" ? setSearchMethod("elastic") : setSearchMethod("pg")
    setCategories([])
    setProducts([])
    setSearchResponseTime(0)
  }

  return (
    <Fragment>
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
        <DialogContent id="scrollableDiv" dividers={true}>
          <InfiniteScroll
            dataLength={products.length} //This is important field to render the next data
            next={() => getMoreSearchResults(nextPage)}
            hasMore={nextPage}
            scrollableTarget="scrollableDiv"
            height={520}
            loader={
              searchInput &&
              nextPage && (
                <Loader>
                  <CircularProgress color="inherit" />
                </Loader>
              )
            }
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
        <DialogActions sx={{ justifyContent: "start" }}>
          <SearchDetailsContainer>
            <SwitchLabel>Search method: </SwitchLabel>
            <BasicSwitch leftLabel="PG" rightLabel="Elastic" handleOnSwitch={handleSwitchSearchMethod} />
            <ResponseTimeTitle>Response time: {searchResponseTime} ms</ResponseTimeTitle>
          </SearchDetailsContainer>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default SearchBox
