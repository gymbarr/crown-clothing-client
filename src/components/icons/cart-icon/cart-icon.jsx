import { useSelector } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../../assets/shopping-bag.svg'

import { selectCartCount } from '../../../store/cart/cart-selector'

import { CartIconContainer, ItemCount } from './cart-icon.styles'

function CartIcon(props) {
  const { setIsDropdownVisible } = props
  const cartCount = useSelector(selectCartCount)

  const handleIsDropdownVisible = () => {
    setIsDropdownVisible(true)
  }

  return (
    <CartIconContainer onClick={handleIsDropdownVisible}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
