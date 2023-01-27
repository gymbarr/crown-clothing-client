import { useState, Fragment } from "react"
import { useSelector } from "react-redux"
import { useStripe } from "@stripe/react-stripe-js"

import { selectCurrentUser } from "../../store/user/user-selector"
import { createCharge } from "../../utils/api/charges"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button"

import {
  PaymentContainer,
  PaymentButtonContainer,
  UnderlinedLink,
} from "./payment.styles"

const Payment = (props) => {
  const { amount, backUrl } = props
  const stripe = useStripe()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const currentUser = useSelector(selectCurrentUser)

  const handlePayment = async (event) => {
    event.preventDefault()

    if (!stripe || !currentUser) return

    setIsProcessingPayment(true)

    createCharge(amount * 100, backUrl)
      .then((response) => response.data.session)
      .then((sessionUrl) => (window.location.href = sessionUrl))
      .catch((error) => {
        // error handling
      })

    setIsProcessingPayment(true)
  }

  return (
    <PaymentContainer>
      {currentUser ? (
        <Fragment>
          Credit Card Payment:
          <PaymentButtonContainer>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.inverted}
              disabled={!stripe}
              isLoading={isProcessingPayment}
              onClick={handlePayment}
            >
              Pay now
            </Button>
          </PaymentButtonContainer>
        </Fragment>
      ) : (
        <UnderlinedLink to="/auth">You need to sign in to make payments</UnderlinedLink>
      )}
    </PaymentContainer>
  )
}

export default Payment
