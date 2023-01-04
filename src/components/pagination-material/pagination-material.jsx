import { Pagination } from "@mui/material"
import { PaginationContainer } from "./pagination-material.styles"

const PaginationMaterial = (props) => {
  const { totalPages, currentPage, setCurrentPage, scrollToRef = null } = props

  const pageChangeHandler = (event, pageNumber = 1) => {
    setCurrentPage(pageNumber)
    if (scrollToRef) window.scrollTo({ behavior: 'smooth', top: scrollToRef.current.offsetTop })
    
  }

  return (
    <PaginationContainer>
      <Pagination
        count={totalPages}
        variant="outlined"
        size="large"
        page={currentPage}
        onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}
      />
    </PaginationContainer>
  )
}

export default PaginationMaterial
