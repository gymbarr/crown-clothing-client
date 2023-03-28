import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import CartDropdown from '../../components/cart/cart-dropdown/cart-dropdown'
import CartIcon from '../../components/icons/cart-icon/cart-icon'
import SearchIcon from '../../components/icons/search-icon/search-icon'
import UserIcon from '../../components/icons/user-icon/user-icon'
import UserDropdown from '../../components/users/user-dropdown/user-dropdown'
import useComponentVisible from '../../custom-hooks/use-component-visible'
import { selectCurrentUser } from '../../store/user/user-selector'

const Navigation = () => {
  const {
    ref: userDropdownRef,
    isComponentVisible: isUserDropdownVisible,
    setIsComponentVisible: setIsUserDropdownVisible,
  } = useComponentVisible(false)
  const {
    ref: cartDropdownRef,
    isComponentVisible: isCartDropdownVisible,
    setIsComponentVisible: setIsCartDropdownVisible,
  } = useComponentVisible(false)
  const currentUser = useSelector(selectCurrentUser)

  return (
    <>
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
        {isUserDropdownVisible && (
          <UserDropdown
            dropdownRef={userDropdownRef}
            setIsDropdownVisible={setIsUserDropdownVisible}
          />
        )}
        {isCartDropdownVisible && (
          <CartDropdown
            dropdownRef={cartDropdownRef}
            setIsDropdownVisible={setIsCartDropdownVisible}
          />
        )}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
