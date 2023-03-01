import { useNavigate } from "react-router-dom"

import {
  ProductCardContainer,
  Footer,
  Title,
  Price,
} from "./product-card.styles"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { id, category, title, imageUrl, price } = product
  const route = `/shop/${category}/products/${id}`

  const onNavigateHandler = () => navigate(route)

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${title}`} onClick={onNavigateHandler} />
      <Footer>
        <Title>{title}</Title>
        <Price>{price}</Price>
      </Footer>
    </ProductCardContainer>
  )
}

export default ProductCard
