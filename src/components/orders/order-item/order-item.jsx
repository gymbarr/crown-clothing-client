import {
  OrderItemContainer,
  ImageContainer,
  Description,
  Title,
  Details,
  Quantity,
  Price,
} from "./order-item.styles"

const OrderItem = ({ orderItem }) => {
  const { title, quantity, imageUrl, price, color, size } = orderItem

  return (
    <OrderItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <Description>
        <Title>{title}</Title>
        <Details>{`Color: ${color}, size: ${size}`}</Details>
      </Description>
      <Quantity>{quantity}</Quantity>
      <Price>{price}</Price>
    </OrderItemContainer>
  )
}

export default OrderItem