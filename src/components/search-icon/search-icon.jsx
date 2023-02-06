import { Fragment } from "react"

import { ReactComponent as SearchLogo } from "../../assets/search.svg"
import { SearchIconContainer } from "./search-icon.styles"

const SearchIcon = () => {
  return (
    <Fragment>
      <SearchIconContainer>
        <SearchLogo />
      </SearchIconContainer>
    </Fragment>
  )
}

export default SearchIcon
