import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { OutlinedInput } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const SearchBox = (props) => {
  const { isOpened, setIsOpened } = props

  const handleClose = () => {
    setIsOpened(false)
  }

  const descriptionElementRef = useRef(null)

  useEffect(() => {
    if (isOpened) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isOpened])

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle>
          <OutlinedInput placeholder="Please enter text" fullWidth />
        </DialogTitle>
        <DialogContent dividers="paper">
          <DialogContentText
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SearchBox