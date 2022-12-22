import { useDispatch, useSelector } from "react-redux"

import { toggleDropdownVisible } from "../../store/user/user-action"
import { selectDropdownVisible } from "../../store/user/user-selector"

import { UserIconContainer } from "./user-icon.styles"

import { ReactComponent as UserLogo } from "../../assets/user.svg"

export const UserIcon = () => {
  const dispatch = useDispatch()
  const dropdownVisible = useSelector(selectDropdownVisible)

  const handleToggleDropdownVisible = () => dispatch(toggleDropdownVisible(!dropdownVisible))

  return (
    <UserIconContainer onClick={handleToggleDropdownVisible}>
      <UserLogo />
    </UserIconContainer>
  )
}
