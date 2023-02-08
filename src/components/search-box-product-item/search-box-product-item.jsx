import { useNavigate } from "react-router-dom"

import {
  SearchBoxItemContainer,
  ImageContainer,
  Title,
  Price,
} from "./search-box-product-item.styles"

const SearchBoxProductItem = ({ product, handleCloseDialog }) => {
  const navigate = useNavigate()
  const { id, category, title, imageUrl, price } = product
  const route = `/shop/${category}/products/${id}`

  const onNavigateHandler = () => {
    handleCloseDialog()
    navigate(route, { replace: true })
  }
    
  return (
    <SearchBoxItemContainer onClick={onNavigateHandler}>
      <ImageContainer>
        <img src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <Title>{title}</Title>
      <Price>Price: {price}</Price>
    </SearchBoxItemContainer>
  )
}

export default SearchBoxProductItem
