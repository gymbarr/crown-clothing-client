import styled from 'styled-components'

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
    cursor: pointer;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }
`

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

export const Title = styled.span`
  width: 90%;
  margin-bottom: 15px;
`

export const Price = styled.span`
  width: 10%;
`
