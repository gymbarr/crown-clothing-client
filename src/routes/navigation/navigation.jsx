import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import useComponentVisible from "../../custom-hooks/use-component-visible"
import { UserIcon } from "../../components/user-icon/user-icon"
import { CartIcon } from "../../components/cart-icon/cart-icon"
import UserDropdown from "../../components/user-dropdown/user-dropdown" 
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import SearchIcon from "../../components/search-icon/search-icon"
import { selectCurrentUser } from "../../store/user/user-selector"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  const { ref: userDropdownRef, isComponentVisible: isUserDropdownVisible, setIsComponentVisible: setIsUserDropdownVisible } = useComponentVisible(false)
  const { ref: cartDropdownRef, isComponentVisible: isCartDropdownVisible, setIsComponentVisible: setIsCartDropdownVisible } = useComponentVisible(false)
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="nav-logo" />
        </LogoContainer>
        <NavLinks>
          <SearchIcon />
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <UserIcon setIsDropdownVisible={setIsUserDropdownVisible} />
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon setIsDropdownVisible={setIsCartDropdownVisible} />
        </NavLinks>
        {isUserDropdownVisible && <UserDropdown dropdownRef={userDropdownRef} setIsDropdownVisible={setIsUserDropdownVisible} />}
        {isCartDropdownVisible && <CartDropdown dropdownRef={cartDropdownRef} setIsDropdownVisible={setIsCartDropdownVisible} />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
