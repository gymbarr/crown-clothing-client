import styled from "styled-components"

export const Title = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`

export const OrderContainer = styled.div`
  width: 60%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`

export const OrderHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-start;
  border-bottom: 1px solid darkgrey;
`

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 100%;

  &:first-child {
    width: 14%;
  }

  &:nth-child(2) {
    width: 43%;
  }

  &:nth-child(3) {
    width: 19%;
  }

  &:nth-child(4) {
    width: 15%;
  }

  &:last-child {
    width: 0%;
  }
`

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`
