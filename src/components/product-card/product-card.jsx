import Button, { BUTTON_TYPE_CLASSES } from "../button/button"

import {
  ProductCardContainer,
  Footer,
  Title,
  Price,
} from "./product-card.styles"

const ProductCard = ({ product }) => {
  const { title, imageUrl, price } = product

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${title}`} />
      <Footer>
        <Title>{title}</Title>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  )
}

export default ProductCard
