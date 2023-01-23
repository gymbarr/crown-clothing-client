import Button from "../button/button"
import CartItem from "../cart-item/cart-item"

import { useSelector } from "react-redux"

import { selectCartItems } from "../../store/cart/cart-selector"

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles"

const CartDropwdown = (props) => {
  const { dropdownRef, setIsDropdownVisible } = props
  const cartItems = useSelector(selectCartItems)

  return (
    <CartDropdownContainer ref={dropdownRef}>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropwdown