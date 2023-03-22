import styled from "styled-components"

export const OrderItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  justify-content: flex-start;
`

export const ImageContainer = styled.div`
  width: 10%;
  margin-right: 35px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const Description = styled.span`
  width: 43%;
`

export const Title = styled.div`
  font-size: 20px;
`

export const Details = styled.div`
  font-size: 13px;
  margin-top: 10px;
`

export const Quantity = styled.span`
  display: flex;
  width: 19%;
`

export const Arrow = styled.div`
  cursor: pointer;
`

export const Value = styled.span`
  margin: 0 15px;
`

export const Price = styled.span`
  width: 18%;
`

export const RemoveButton = styled.div`
  cursor: pointer;
  width: 0%;
`
