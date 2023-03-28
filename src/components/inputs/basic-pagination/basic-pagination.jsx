import { Pagination } from '@mui/material'

const BasicPagination = (props) => {
  const { totalPages, currentPage, handleOnChange } = props

  return (
    <Pagination
      count={totalPages}
      variant="outlined"
      size="large"
      page={currentPage}
      onChange={(event, page) => handleOnChange(page)}
    />
  )
}

export default BasicPagination
