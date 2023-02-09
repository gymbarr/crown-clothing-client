import { Fragment } from "react"

import { ArrowIconContainer } from "./rounded-arrow-icon.styles"

import { ReactComponent as RoundedArrowLogo } from "../../assets/arrow-right-rounded.svg"

const RoundedArrowIcon = () => {

  return (
    <Fragment>
      <ArrowIconContainer>
        <RoundedArrowLogo />
      </ArrowIconContainer>
    </Fragment>
  )
}

export default RoundedArrowIcon
