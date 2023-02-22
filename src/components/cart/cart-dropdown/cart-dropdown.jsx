import Button from "../../inputs/button/button"
import CartItem from "../cart-item/cart-item"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { selectCartItems } from "../../../store/cart/cart-selector"

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles"

const CartDropwdown = (props) => {
  const { dropdownRef, setIsDropdownVisible } = props
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)

  const goToCheckoutHandler = () => {
    setIsDropdownVisible(false)
    navigate("/checkout")
  }

  return (
    <CartDropdownContainer ref={dropdownRef}>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropwdown