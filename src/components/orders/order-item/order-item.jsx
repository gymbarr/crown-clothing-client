import {
  OrderItemContainer,
  ImageContainer,
  BaseSpan,
  Title,
  Description,
  Quantity,
  Value,
} from "./order-item.styles"

const OrderItem = ({ orderItem }) => {
  const { title, quantity, imageUrl, price, color, size } = orderItem

  return (
    <OrderItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <BaseSpan>
        <Title>{title}</Title>
        <Description>{`Color: ${color}, size: ${size}`}</Description>
      </BaseSpan>
      <Quantity>
        <Value>{quantity}</Value>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
    </OrderItemContainer>
  )
}

export default OrderItem