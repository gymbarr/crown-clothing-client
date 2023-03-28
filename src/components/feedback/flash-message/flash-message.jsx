import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

import MessageContainer from './flash-message.styles'
import selectFlashMessages from '../../../store/flash/flash-selector'

function FlashMessage() {
  const messages = useSelector(selectFlashMessages)

  return (
    <div>
      {messages && messages.map((message, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MessageContainer key={index}>
          {message.type === 'error' && (
            <Alert severity="error">{message.text}</Alert>
          )}
          {message.type === 'success' && (
            <Alert severity="success">{message.text}</Alert>
          )}
        </MessageContainer>
      ))}
    </div>
  )
}

export default FlashMessage
