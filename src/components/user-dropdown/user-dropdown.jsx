import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setCurrentUser } from "../../store/user/user-action"
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
    dispatch(setCurrentUser(null))
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
