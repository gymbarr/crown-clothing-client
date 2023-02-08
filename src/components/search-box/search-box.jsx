import { useState, useEffect, useRef, Fragment } from "react"
import { useDebounce } from "use-debounce"
import { OutlinedInput } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { IconButton } from "@mui/material"
import CloseIcon from "../close-icon/close-icon"
import SearchBoxItem from "../search-box-item/search-box-item"
import InfiniteScroll from "react-infinite-scroll-component"
import { CircularProgress } from "@mui/material"
import { searchProducts } from "../../utils/api/search"

import {
  SearchInputContainer,
  ItemsContainer,
  Item,
  NothingFoundText,
  Loader,
} from "./search-box.styles"

const SearchBox = (props) => {
  const { isOpened, setIsOpened } = props
  const [searchInput, setSearchInput] = useState("")
  const [products, setProducts] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [value] = useDebounce(searchInput, 400);

  useEffect(() => {
    setNextPage(1)
    searchInput.length > 0 ? getSearchedProducts() : setProducts([])
  }, [value])

  const getSearchedProducts = (nextPage = 1) => {
    searchProducts(searchInput, nextPage)
      .then((response) => {
        nextPage > 1
        ? setProducts(products.concat(response.data.products))
        : setProducts(response.data.products)
        setNextPage(response.data.pagy.next)
      })
      .catch((error) => {
        // error handling
      })
  }

  const handleClose = () => {
    setIsOpened(false)
    setSearchInput("")
    setProducts([])
  }

  const handleOnSearchChange = (event) => setSearchInput(event.target.value)

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
            next={() => getSearchedProducts(nextPage)}
            hasMore={nextPage}
            scrollableTarget="scrollableDiv"
            height={520}
            loader={
              searchInput && nextPage &&
              <Loader>
                <CircularProgress color="inherit" />
              </Loader>
            }
          >
            <ItemsContainer>
              <Item>
                {products.length > 0 ? (
                  products.map((product) => (
                    <SearchBoxItem key={product.id} product={product} />
                  ))
                ) : (
                  <NothingFoundText>Nothing was found...</NothingFoundText>
                )}
              </Item>
            </ItemsContainer>
          </InfiniteScroll>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default SearchBox
