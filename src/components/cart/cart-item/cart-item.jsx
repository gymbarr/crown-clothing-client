import { CartItemContainer, ItemDetails } from "./cart-item.styles"

const CartItem = ({ cartItem }) => {
  const { title, quantity, imageUrl, price } = cartItem

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${title}`} />
      <ItemDetails>
        <span>{title}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem