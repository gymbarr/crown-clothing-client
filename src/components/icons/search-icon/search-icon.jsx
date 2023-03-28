import { useState } from 'react'

import SearchIconContainer from './search-icon.styles'
import { ReactComponent as SearchLogo } from '../../../assets/search.svg'
import SearchBox from '../../search/search-box/search-box'

function SearchIcon() {
  const [searchBoxOpened, setSearchBoxOpened] = useState(false)

  const handleOnSearchClick = () => setSearchBoxOpened(true)

  return (
    <>
      <SearchIconContainer>
        <SearchLogo onClick={handleOnSearchClick} />
      </SearchIconContainer>
      <SearchBox isOpened={searchBoxOpened} setIsOpened={setSearchBoxOpened} />
    </>
  )
}

export default SearchIcon
