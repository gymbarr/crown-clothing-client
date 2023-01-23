import { useSelector, useDispatch } from "react-redux"

import {
  changeCartItemQuantity,
  removeItemFromCart,
} from "../../store/cart/cart-action"
import { selectCartItems } from "../../store/cart/cart-selector"

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles"

const CheckoutItem = ({ checkoutItem }) => {
  const dispatch = useDispatch()
  const { title, quantity, imageUrl, price } = checkoutItem
  const cartItems = useSelector(selectCartItems)

  const incrementQuantityHandler = () =>
    dispatch(changeCartItemQuantity(cartItems, checkoutItem, 1))
  const decrementQuantityHandler = () =>
    dispatch(changeCartItemQuantity(cartItems, checkoutItem, -1))
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, checkoutItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <BaseSpan>{title}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrementQuantityHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem