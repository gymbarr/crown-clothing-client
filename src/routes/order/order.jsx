import { useEffect, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import OrderItem from "../../components/orders/order-item/order-item"
import Payment from "../../components/checkout/payment/payment"
import Loader from "../../components/feedback/loader/loader"
import { selectCurrentUser } from "../../store/user/user-selector"
import { getOrder } from "../../utils/api/orders"

import {
  Title,
  OrderContainer,
  OrderHeader,
  HeaderBlock,
  Total,
} from "./order.styles"

const Order = () => {
  const { orderId } = useParams()
  const currentUser = useSelector(selectCurrentUser)
  const [order, setOrder] = useState({})
  const { line_items: orderItems, total, status, id } = order

  useEffect(() => {
    if (!currentUser) return

    getOrder(currentUser.username, orderId)
      .then(response => setOrder(response.data))
      .catch((error) => {
        // error handling
      })
  }, [currentUser])

  return (
    <Fragment>
      <Title>Order №{id}</Title>
      {Object.keys(order).length ? (
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
            <OrderItem key={item.id} orderItem={item} />
          ))}
          <Total>{`TOTAL: $${total}`}</Total>
          {status === "unpaid" && (
            <Payment />
          )}
        </OrderContainer>
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default Order
