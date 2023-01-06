import { Pagination } from "@mui/material"

const PaginationMaterial = (props) => {
  const { totalPages, currentPage, setActivePage, scrollToRef = null } = props

  const pageChangeHandler = (event, page = 1) => {
    setActivePage(page)
    if (scrollToRef) window.scrollTo({ behavior: 'smooth', top: scrollToRef.current.offsetTop })
    
  }

  return (
    <Pagination
      count={totalPages}
      variant="outlined"
      size="large"
      page={currentPage}
      onChange={(event, page) => pageChangeHandler(event, page)}
    />
  )
}

export default PaginationMaterial
