import {
  decrementLineItemQuantity,
  incrementLineItemQuantity,
  removeLineItem,
} from "../../../utils/api/line_items"

import {
  OrderItemContainer,
  ImageContainer,
  Description,
  Title,
  Details,
  Quantity,
  Arrow,
  Value,
  Price,
  RemoveButton,
} from "./order-item.styles"

const OrderItem = ({ orderItem, refreshOrder, isEditable }) => {
  const { id, title, quantity, imageUrl, price, color, size } = orderItem

  const handleDecrementQuantity = () => {
    quantity > 1 ? (
      decrementLineItemQuantity(id)
        .then(() => refreshOrder())
    ) : (
      removeLineItem(id)
        .then(() => refreshOrder())
    )
  }

  const handleIncrementQuantity = () => {
    incrementLineItemQuantity(id)
      .then(() => refreshOrder())
  }

  const handleRemoveLineItem = () => {
    removeLineItem(id)
      .then(() => refreshOrder())
  }

  return (
    <OrderItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${title}`} />
      </ImageContainer>
      <Description>
        <Title>{title}</Title>
        <Details>{`Color: ${color}, size: ${size}`}</Details>
      </Description>
      <Quantity>
        {isEditable &&
          <Arrow onClick={handleDecrementQuantity}>&#10094;</Arrow>
        }
        <Value>{quantity}</Value>
        {isEditable &&
          <Arrow onClick={handleIncrementQuantity}>&#10095;</Arrow>
        }
      </Quantity>
      <Price>{price}</Price>
      {isEditable &&
        <RemoveButton onClick={handleRemoveLineItem}>&#10005;</RemoveButton>
      }
    </OrderItemContainer>
  )
}

export default OrderItem
