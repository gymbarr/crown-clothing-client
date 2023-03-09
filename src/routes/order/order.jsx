import { useEffect, Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import OrderItem from "../../components/orders/order-item/order-item"
import Payment from "../../components/checkout/payment/payment"
import { showFlashMessageAsync } from "../../store/flash/flash-action"
import { selectCurrentUser } from "../../store/user/user-selector"
import { createOrder } from "../../utils/api/orders"
import Button from "../../components/inputs/button/button"
import { BUTTON_TYPE_CLASSES } from "../../components/inputs/button/button"

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  UnderlinedLink,
  CheckoutButtonContainer,
} from "./checkout.styles"

const Checkout = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [order, setOrder] = useState({})
  const { line_items: orderItems, total, status } = order

  return (
    <Fragment>
      {orderItems.length ? (
        <OrderContainer>
          <OrderHeader>
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
          </OrderHeader>
          {orderItems.map((item) => (
            <OrderItem key={item.id} checkoutItem={item} />
          ))}
          <Total>{`TOTAL: $${total}`}</Total>
          <CheckoutButtonContainer>
            {orderCreated ? (
              <Payment amount={cartPrice} backUrl={checkoutUrl} />
            ) : (
              <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={handleSubmitOrder}
                >
                Checkout
              </Button>
            )}
          </CheckoutButtonContainer>
        </OrderContainer>
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
