import Button, { BUTTON_TYPE_CLASSES } from "../../inputs/button/button"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addItemToCart } from "../../../store/cart/cart-action"
import { selectCartItems } from "../../../store/cart/cart-selector"

import {
  ProductCardContainer,
  Footer,
  Title,
  Price,
} from "./product-card.styles"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id, category, title, imageUrl, price } = product
  const cartItems = useSelector(selectCartItems)
  const route = `/shop/${category}/products/${id}`

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  const onNavigateHandler = () => navigate(route)

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${title}`} onClick={onNavigateHandler} />
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
