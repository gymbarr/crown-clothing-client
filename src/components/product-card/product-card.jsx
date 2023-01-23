import Button, { BUTTON_TYPE_CLASSES } from "../button/button"
import { useSelector, useDispatch } from "react-redux"

import { addItemToCart } from "../../store/cart/cart-action"
import { selectCartItems } from "../../store/cart/cart-selector"

import {
  ProductCardContainer,
  Footer,
  Title,
  Price,
} from "./product-card.styles"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { title, imageUrl, price } = product
  const cartItems = useSelector(selectCartItems)

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${title}`} />
      <Footer>
        <Title>{title}</Title>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  )
}

export default ProductCard
