import { useEffect, useRef } from "react"
import { OutlinedInput } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { IconButton } from "@mui/material"
import CloseIcon from "../close-icon/close-icon"

import { SearchInputContainer, ItemsContainer, Item } from "./search-box.styles"

const SearchBox = (props) => {
  const { isOpened, setIsOpened } = props
  const descriptionElementRef = useRef(null)

  useEffect(() => {
    if (isOpened) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isOpened])

  const handleClose = () => {
    setIsOpened(false)
  }

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          <SearchInputContainer>
            <OutlinedInput placeholder="Please enter text" fullWidth />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </SearchInputContainer>
        </DialogTitle>
        <DialogContent dividers="paper">
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <ItemsContainer>
              <Item>
              </Item>
            </ItemsContainer>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchBox
