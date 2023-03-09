import styled from "styled-components"

export const OrderItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const BaseSpan = styled.span`
  width: 23%;
  padding-right: 20px;
`

export const Title = styled.div`
  font-size: 20px;
`

export const Description = styled.div`
  font-size: 13px;
  margin-top: 10px;
`

export const Quantity = styled(BaseSpan)`
  display: flex;
`

export const Value = styled.span`
  margin: 0 15px;
`
