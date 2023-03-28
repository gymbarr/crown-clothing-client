import { useNavigate } from 'react-router-dom'

import {
  BackgroundImage,
  Body,
  CategoryItemContainer,
} from './category-item.styles'

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category
  const route = `/shop/${title}`
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)

  return (
    <CategoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  )
}

export default CategoryItem
