import UserIconContainer from './user-icon.styles'
import { ReactComponent as UserLogo } from '../../../assets/user.svg'

const UserIcon = (props) => {
  const { setIsDropdownVisible } = props

  const handleIsDropdownVisible = () => setIsDropdownVisible(true)

  return (
    <UserIconContainer onClick={handleIsDropdownVisible}>
      <UserLogo />
    </UserIconContainer>
  )
}

export default UserIcon
