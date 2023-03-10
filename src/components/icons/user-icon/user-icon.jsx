import { Fragment } from "react"

import { UserIconContainer } from "./user-icon.styles"

import { ReactComponent as UserLogo } from "../../../assets/user.svg"

const UserIcon = (props) => {
  const { setIsDropdownVisible } = props

  const handleIsDropdownVisible = () => setIsDropdownVisible(true)

  return (
    <Fragment>
      <UserIconContainer onClick={handleIsDropdownVisible}>
        <UserLogo />
      </UserIconContainer>
    </Fragment>
  )
}

export default UserIcon
