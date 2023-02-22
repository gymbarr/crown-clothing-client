import { useState, Fragment } from "react"
import SearchBox from "../../search/search-box/search-box"

import { ReactComponent as SearchLogo } from "../../../assets/search.svg"
import { SearchIconContainer } from "./search-icon.styles"

const SearchIcon = () => {
  const [searchBoxOpened, setSearchBoxOpened] = useState(false)

  const handleOnSearchClick = () => setSearchBoxOpened(true)

  return (
    <Fragment>
      <SearchIconContainer>
        <SearchLogo onClick={handleOnSearchClick} />
      </SearchIconContainer>
      <SearchBox isOpened={searchBoxOpened} setIsOpened={setSearchBoxOpened} />
    </Fragment>
  )
}

export default SearchIcon
