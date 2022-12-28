import { useSelector } from "react-redux"
import { selectFlashMessages } from "../../store/flash/flash-selector"

import { Message } from "./flash-message.styles"


const FlashMessage = () => {
  const messages = useSelector(selectFlashMessages)

  if (!messages) {
    return
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <Message>{message}</Message> 
        </div>
      ))}
    </div>
  )
}

export default FlashMessage
