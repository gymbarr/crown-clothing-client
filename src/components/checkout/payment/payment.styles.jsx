import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const PaymentContainer = styled.div`
  display: inline-block;
  margin-left: auto;
  margin-top: 30px;
  font-size: 20px;
`

export const PaymentButtonContainer = styled.span`
  display: inline-block;
  margin-left: 20px;
`

export const UnderlinedLink = styled(Link)`
  text-decoration: underline;
`
