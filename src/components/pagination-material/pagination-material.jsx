import { Pagination } from "@mui/material"

const PaginationMaterial = (props) => {
  const { totalPages, currentPage, setCurrentPage, scrollToRef = null } = props

  const pageChangeHandler = (event, pageNumber = 1) => {
    setCurrentPage(pageNumber)
    if (scrollToRef) window.scrollTo({ behavior: 'smooth', top: scrollToRef.current.offsetTop })
    
  }

  return (
    <Pagination
      count={totalPages}
      variant="outlined"
      size="large"
      page={currentPage}
      onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}
    />
  )
}

export default PaginationMaterial
