import { Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import CheckoutItem from "../../components/checkout/checkout-item/checkout-item"
import { setCartState } from "../../store/cart/cart-action"
import {
  selectCartItems,
  selectCartPrice,
} from "../../store/cart/cart-selector"
import { selectCurrentUser } from "../../store/user/user-selector"
import { createOrder } from "../../utils/api/orders"
import Button from "../../components/inputs/button/button"
import { BUTTON_TYPE_CLASSES } from "../../components/inputs/button/button"
import { CART_INITIAL_STATE } from "../../store/cart/cart-reducer"

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  UnderlinedLink,
  CheckoutButtonContainer,
} from "./checkout.styles"

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const cartPrice = useSelector(selectCartPrice)
  const currentUser = useSelector(selectCurrentUser)

  const handleSubmitOrder = () => {
    const lineItems = cartItems.map(item => (
      {
        variant_id: item.id, 
        quantity: item.quantity
      }
    ))
    
    createOrder(lineItems, currentUser.username)
      .then((response) => {
        const orderId = response.data.id

        dispatch(setCartState(CART_INITIAL_STATE)) 
        navigate(`/orders/${orderId}`)
      })
      .catch((error) => {
        // error handling
      })
  }

  return (
    <Fragment>
      {cartItems.length ? (
        <CheckoutContainer>
          <CheckoutHeader>
            <HeaderBlock>
              <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Description</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Remove</span>
            </HeaderBlock>
          </CheckoutHeader>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} checkoutItem={item} />
          ))}
          <Total>{`TOTAL: $${cartPrice}`}</Total>
          <CheckoutButtonContainer>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.inverted}
              onClick={handleSubmitOrder}
              >
              Checkout
            </Button>
          </CheckoutButtonContainer>
        </CheckoutContainer>
      ) : (
        <div>
          <h1>Your cart is empty.</h1>
          <p>To find the products you need, use the search or catalog.</p>
          <h3>
            <UnderlinedLink to="/">Home</UnderlinedLink>
          </h3>
        </div>
      )}
    </Fragment>
  )
}

export default Checkout
