import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button"
import { createCharge } from "../../utils/api/charges"

import { PaymentFormContainer, FormContainer } from "./payment-form.styles"

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  
  const handlePayment = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }
    
    const clientSecret = await createCharge(1000)
      .then((response) => response.data.clientSecret)
      .catch((error) => {
        // error handling
      })


    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Andrey",
        }
      }
    })

    if (paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment successful")
      }
    }
  }

  return (
    <PaymentFormContainer onSubmit={handlePayment}>
      <FormContainer>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} disabled={!stripe}> Pay now </Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm
