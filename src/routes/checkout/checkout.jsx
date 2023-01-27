import { useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useIsMount } from "../../custom-hooks/use-is-mount"

import CheckoutItem from "../../components/checkout-item/checkout-item"
import Payment from "../../components/payment/payment"
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
} from "./checkout.styles"

const Checkout = () => {
  const isMount = useIsMount()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartPrice = useSelector(selectCartPrice)
  const checkoutUrl = "http://localhost:3001/checkout"

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get("success")) {
      dispatch(setCartState(CART_INITIAL_STATE))
      dispatch(
        showFlashMessageAsync({
          text: "Order placed! You will receive an email confirmation",
          type: "success",
        })
      )
    }

    if (query.get("canceled")) {
      dispatch(
        showFlashMessageAsync({
          text: "Order canceled -- continue to shop around and checkout when you're ready",
          type: "error",
        })
      )
    }

  }, [])

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
          <Payment amount={cartPrice} backUrl={checkoutUrl} />
        </CheckoutContainer>
      ) : (
        <div>
          <h1>Your cart is empty.</h1>
          <p>To find the products you need, use the search or catalog.</p>
          <h3>
            <Link to="/">Home</Link>
          </h3>
        </div>
      )}
    </Fragment>
  )
}

export default Checkout
