import { Fragment } from "react"

import { UserIconContainer } from "./user-icon.styles"

import { ReactComponent as UserLogo } from "../../assets/user.svg"

export const UserIcon = (props) => {
  const { dropdownVisible, setDropdownVisible } = props

  const handleToggleDropdownVisible = () => setDropdownVisible(!dropdownVisible)

  return (
    <Fragment>
      <UserIconContainer onClick={handleToggleDropdownVisible}>
        <UserLogo />
      </UserIconContainer>
    </Fragment>
  )
}
