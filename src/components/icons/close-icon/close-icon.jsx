import { Fragment } from "react"

import { CloseIconContainer } from "./close-icon.styles"

import { ReactComponent as CloseLogo } from "../../../assets/close.svg"

const CloseIcon = () => {

  return (
    <Fragment>
      <CloseIconContainer>
        <CloseLogo />
      </CloseIconContainer>
    </Fragment>
  )
}

export default CloseIcon
