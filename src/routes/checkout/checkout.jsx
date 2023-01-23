import CheckoutItem from "../../components/checkout-item/checkout-item"

import { useSelector } from "react-redux"

import { selectCartItems, selectCartPrice } from "../../store/cart/cart-selector"

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles"

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartPrice = useSelector(selectCartPrice)

  return (
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
    </CheckoutContainer>
  )
}

export default Checkout