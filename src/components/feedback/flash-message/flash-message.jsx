import { Fragment } from "react"
import { useSelector } from "react-redux"
import { selectFlashMessages } from "../../../store/flash/flash-selector"

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
          {message.type === "error" && (
            <Alert severity="error">{message.text}</Alert>
          )}
          {message.type === "success" && (
            <Alert severity="success">{message.text}</Alert>
          )}
        </MessageContainer>
      ))}
    </Fragment>
  )
}

export default FlashMessage
