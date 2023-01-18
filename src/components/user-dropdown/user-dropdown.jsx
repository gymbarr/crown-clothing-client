import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setCurrentUser } from "../../store/user/user-action"
import { selectCurrentUser } from "../../store/user/user-selector"

import { removeToken } from "../../utils/helpers/local-storage-manager"

import { ROLES_NAME } from "../../utils/api/roles_name"

import { DropdownContainer, Items, Item } from "./user-dropdown.styles"

const UserDropwdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const handleSignOut = () => {
    dispatch(setCurrentUser(null))
    removeToken()
    // navigate("/")
  }

  return (
    <DropdownContainer>
      <Items>
        {currentUser?.roles_name.includes(ROLES_NAME.ADMIN_USER) ? (
          <Item>
            <Link to="/admin">ADMINISTRATION</Link>
          </Item>
        ) : (
          false
        )}
        <Item onClick={handleSignOut}>SIGN OUT</Item>
      </Items>
    </DropdownContainer>
  )
}

export default UserDropwdown
