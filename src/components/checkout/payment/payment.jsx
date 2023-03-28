import { useState } from 'react'

import { useSelector } from 'react-redux'

import {
  PaymentContainer,
  PaymentButtonContainer,
  UnderlinedLink,
} from './payment.styles'
import { selectCurrentUser } from '../../../store/user/user-selector'
import { createCharge } from '../../../utils/api/charges'
import Button, { BUTTON_TYPE_CLASSES } from '../../inputs/button/button'

function Payment(props) {
  const { orderId, lineItems, backUrl } = props
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const requestedLineItems = lineItems.map((lineItem) => ({
    variant_id: lineItem.variant_id,
    quantity: lineItem.quantity,
  }))

  const handlePayment = async () => {
    setIsProcessingPayment(true)

    createCharge(orderId, requestedLineItems, backUrl)
      .then((response) => response.data.session)
      .then((sessionUrl) => {
        window.location.href = sessionUrl
      })
      .catch(() => {
        // error handling
        setIsProcessingPayment(false)
      })
  }

  return (
    <PaymentContainer>
      {currentUser ? (
        <>
          Credit Card Payment:
          <PaymentButtonContainer>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.inverted}
              isLoading={isProcessingPayment}
              onClick={handlePayment}
            >
              Pay now
            </Button>
          </PaymentButtonContainer>
        </>
      ) : (
        <UnderlinedLink to="/auth">
          You need to sign in to make payments
        </UnderlinedLink>
      )}
    </PaymentContainer>
  )
}

export default Payment
