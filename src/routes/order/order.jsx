import { useEffect, Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import OrderItem from "../../components/orders/order-item/order-item"
import Payment from "../../components/checkout/payment/payment"
import Loader from "../../components/feedback/loader/loader"
import { getOrder } from "../../utils/api/orders"
import { showFlashMessageAsync } from "../../store/flash/flash-action"

import {
  Title,
  OrderContainer,
  OrderHeader,
  HeaderBlock,
  Total,
} from "./order.styles"

const Order = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const backUrl = `http://localhost:3001/orders/${orderId}`
  const query = new URLSearchParams(window.location.search)
  const [order, setOrder] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { line_items: orderItems, total, status } = order

  useEffect(() => {
    refreshOrder()
    
    if (query.get("success")) {
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

  const refreshOrder = () => {
    setIsLoading(true)
    getOrder(orderId)
      .then(response =>  {
        setOrder(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        // error handling
      })
  }


  return (
    <Fragment>
      <Title>Order №{orderId}</Title>
      {/* {Object.keys(order).length ? ( */}
      {!isLoading ? (
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
            <HeaderBlock>
              <span>Remove</span>
            </HeaderBlock>
          </OrderHeader>
          {orderItems.map((item) => (
            <OrderItem key={item.id} orderItem={item} refreshOrder={refreshOrder} />
          ))}
          <Total>{`TOTAL: $${total}`}</Total>
          {status === "unpaid" && (
            <Payment orderId={orderId} lineItems={orderItems} backUrl={backUrl} />
          )}
        </OrderContainer>
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default Order
