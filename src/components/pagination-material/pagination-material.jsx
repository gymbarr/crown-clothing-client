import { Pagination } from "@mui/material"
import { PaginationContainer } from "./pagination-material.styles"

const PaginationMaterial = (props) => {
  const { totalPages, currentPage, setActivePage } = props

  const pageChangeHandler = (event, pageNumber = 1) => {
    setActivePage(pageNumber)
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
