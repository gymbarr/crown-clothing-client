import { PaginationContainer } from "./pagination-material.styles"

const PaginationMaterial = () => (
  <PaginationContainer>
    <Pagination count={10} variant="outlined" size="large" />
  </PaginationContainer>
)

export default PaginationMaterial
