import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setCurrentUser } from "../../store/user/user-action"
import {
  selectCurrentUser,
  selectDropdownVisible,
} from "../../store/user/user-selector"
import { toggleDropdownVisible } from "../../store/user/user-action"

import { removeToken } from "../../utils/helpers/local-storage-manager"

import { ROLES_NAME } from "../../utils/api/roles_name"

import { DropdownContainer, Items, Item } from "./user-dropdown.styles"

const UserDropwdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dropdownVisible = useSelector(selectDropdownVisible)
  const currentUser = useSelector(selectCurrentUser)

  const handleSignOut = () => {
    dispatch(setCurrentUser(null))
    dispatch(toggleDropdownVisible(!dropdownVisible))
    removeToken()
    navigate("/")
  }

  return (
    <DropdownContainer>
      <Items>
        {currentUser?.roles_name.includes(ROLES_NAME.ADMIN_USER) ? (
          <Link to="/admin">ADMINISTRATION</Link>
        ) : (
          false
        )}
        <Item onClick={handleSignOut}>SIGN OUT</Item>
      </Items>
    </DropdownContainer>
  )
}

export default UserDropwdown
