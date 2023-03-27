import { useNavigate } from 'react-router-dom'

import RoundedArrowIcon from '../../icons/rounded-arrow-icon/rounded-arrow-icon'

import {
  SearchBoxItemContainer,
  ImageContainer,
  Title,

} from './search-box-category-item.styles'

function SearchBoxCategoryItem({ category, handleCloseDialog }) {
  const navigate = useNavigate()
  const { title } = category
  const route = `/shop/${title}`

  const onNavigateHandler = () => {
    handleCloseDialog()
    navigate(route, { replace: true })
  }

  return (
    <SearchBoxItemContainer onClick={onNavigateHandler}>
      <ImageContainer>
        <RoundedArrowIcon />
      </ImageContainer>
      <Title>{title}</Title>
    </SearchBoxItemContainer>
  )
}

export default SearchBoxCategoryItem
