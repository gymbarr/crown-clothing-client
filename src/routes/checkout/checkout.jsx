import { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useStripe } from "@stripe/react-stripe-js"

import CheckoutItem from "../../components/checkout-item/checkout-item"
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button"
import { createCharge } from "../../utils/api/charges"
import { selectCurrentUser } from "../../store/user/user-selector"
import { showFlashMessageAsync } from "../../store/flash/flash-action"
import { setCartState } from "../../store/cart/cart-action"
import {
  selectCartItems,
  selectCartPrice,
} from "../../store/cart/cart-selector"
import { CART_INITIAL_STATE } from "../../store/cart/cart-reducer"

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  PaymentContainer,
  PaymentButtonContainer,
} from "./checkout.styles"

const Checkout = () => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const cartItems = useSelector(selectCartItems)
  const cartPrice = useSelector(selectCartPrice)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const checkoutPath = "http://localhost:3001/checkout"

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get("success")) {
      dispatch(setCartState(CART_INITIAL_STATE))
      dispatch(
        showFlashMessageAsync(
          "Order placed! You will receive an email confirmation."
        )
      )
    }

    if (query.get("canceled")) {
      dispatch(
        showFlashMessageAsync(
          "Order canceled -- continue to shop around and checkout when you're ready."
        )
      )
    }
  }, [cartItems])

  const handlePayment = async (event) => {
    event.preventDefault()

    if (!stripe || !currentUser) return

    setIsProcessingPayment(true)

    createCharge(cartPrice * 100, checkoutPath)
      .then((response) => response.data.session)
      .then((sessionUrl) => (window.location.href = sessionUrl))
      .catch((error) => {
        // error handling
      })

    setIsProcessingPayment(true)
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
        <PaymentContainer>
          {currentUser ? (
            <Fragment>
              Credit Card Payment:
              <PaymentButtonContainer>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.inverted}
                  disabled={!stripe}
                  isLoading={isProcessingPayment}
                  onClick={handlePayment}
                >
                  Pay now
                </Button>
              </PaymentButtonContainer>
            </Fragment>
          ) : (
            <Fragment>
              You need to sign in to make payments
            </Fragment>
          )}
        </PaymentContainer>
      </CheckoutContainer>
      ) : (
        <div>
          <h1>Your cart is empty.</h1>
          <p>To find the products you need, use the search or catalog.</p>
            <h3><Link to="/">Home</Link></h3>
        </div>
      ) }
    </Fragment>
  )
}

export default Checkout
