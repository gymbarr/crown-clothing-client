import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../../utils/api/authentication"

import { selectDropdownVisible } from "../../store/user/user-selector"
import { toggleDropdownVisible } from "../../store/user/user-action"

import {
  DropdownContainer,
  Items,
  Item,
} from "./user-dropdown.styles"

const UserDropwdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dropdownVisible = useSelector(selectDropdownVisible)

  const handleSignOut = () => {
    signOut(dispatch)
    dispatch(toggleDropdownVisible(!dropdownVisible))
    navigate('/')
  }

  return (
    <DropdownContainer>
      <Items>
        <Item onClick={handleSignOut}>
          SIGN OUT
        </Item>
      </Items>
    </DropdownContainer>
  )
}

export default UserDropwdown
