import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"

import { useDispatch, useSelector } from "react-redux"

import { selectCartCount, selectDropdownVisible } from "../../store/cart/cart-selector"

import { CartIconContainer, ItemCount } from "./cart-icon.styles"

export const CartIcon = (props) => {
  const { setIsDropdownVisible } = props
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)

  const handleIsDropdownVisible = () => setIsDropdownVisible(true)

  return (
    <CartIconContainer onClick={handleIsDropdownVisible}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}