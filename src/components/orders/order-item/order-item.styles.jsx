import styled from "styled-components"

export const OrderItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
`

export const ImageContainer = styled.div`
  width: 10%;
  margin-right: 40px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const Description = styled.span`
  width: 45%;
`

export const Title = styled.div`
  font-size: 20px;
`

export const Details = styled.div`
  font-size: 13px;
  margin-top: 10px;
`

export const Quantity = styled.span`
  width: 35%;
`

export const Price = styled.span`
  width: 9%;
`
