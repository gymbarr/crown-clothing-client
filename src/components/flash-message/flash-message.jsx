import { Fragment } from "react"
import { useSelector } from "react-redux"
import { selectFlashMessages } from "../../store/flash/flash-selector"

import { Alert } from "@mui/material"
import { MessageContainer } from "./flash-message.styles"

const FlashMessage = () => {
  const messages = useSelector(selectFlashMessages)

  if (!messages) {
    return
  }

  return (
    <Fragment>
      {messages.map((message, index) => (
        <MessageContainer key={index}>
          <Alert severity="error">{message}</Alert> 
        </MessageContainer>
      ))}
    </Fragment>
  )
}

export default FlashMessage
