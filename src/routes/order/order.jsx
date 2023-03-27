import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import OrderItem from '../../components/orders/order-item/order-item'
import Payment from '../../components/checkout/payment/payment'
import Loader from '../../components/feedback/loader/loader'
import { getOrder, removeOrder } from '../../utils/api/orders'
import { showFlashMessageAsync } from '../../store/flash/flash-action'

import {
  Title,
  OrderContainer,
  OrderHeader,
  HeaderBlock,
  Total,
} from './order.styles'

function Order() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const backUrl = `http://localhost:3001/orders/${orderId}`
  const query = new URLSearchParams(window.location.search)
  const [order, setOrder] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { line_items: orderItems, total, status } = order
  const isOrderEditable = status === 'unpaid'

  const isOrderEmpty = (lineItems) => {
    if (lineItems.length > 0) return

    setIsLoading(true)
    removeOrder(orderId)
      .then(() => {
        navigate('/orders')
        dispatch(
          showFlashMessageAsync({
            text: `The order №${orderId} was successfuly deleted`,
            type: 'success',
          }),
        )
      })
      .catch(() => {
        // error handling
      })
      .finally(() => setIsLoading(false))
  }

  const refreshOrder = () => {
    setIsLoading(true)
    getOrder(orderId)
      .then((response) => {
        setOrder(response.data)
        isOrderEmpty(response.data.line_items)
      })
      .catch(() => {
        // error handling
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    refreshOrder()

    if (query.get('success')) {
      dispatch(
        showFlashMessageAsync({
          text: 'Order placed! You will receive an email confirmation',
          type: 'success',
        }),
      )
    }
    if (query.get('canceled')) {
      dispatch(
        showFlashMessageAsync({
          text: "Order canceled -- continue to shop around and checkout when you're ready",
          type: 'error',
        }),
      )
    }
  }, [])

  return (
    <>
      <Title>
        Order №
        {orderId}
      </Title>
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
            <OrderItem
              key={item.id}
              orderItem={item}
              refreshOrder={refreshOrder}
              isEditable={isOrderEditable}
            />
          ))}
          <Total>{`TOTAL: $${total}`}</Total>
          {status === 'unpaid' && (
            <Payment
              orderId={orderId}
              lineItems={orderItems}
              backUrl={backUrl}
            />
          )}
        </OrderContainer>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Order
