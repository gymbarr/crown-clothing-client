import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { getProduct } from "../../utils/api/products"
import { selectCartItems } from "../../store/cart/cart-selector"
import { addItemToCart } from "../../store/cart/cart-action"

import Button from "../../components/button/button"
import SelectMaterial from "../../components/select-material/select-material"
import {
  Title,
  ProductContainer,
  ImageContainer,
  Info,
  InfoItem,
} from "./product.styles"

const Product = () => {
  const dispatch = useDispatch()
  const { productCategory, productId } = useParams()
  const [product, setProduct] = useState({})
  const [color, setColor] = useState()
  const cartItems = useSelector(selectCartItems)

  const { title, imageUrl, category, price, colors } = product

  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = () => {
    getProduct(productCategory, productId, color).then((response) =>
      setProduct(response.data)
    )
  }

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  return (
    <Fragment>
      <Title>{title?.toUpperCase()}</Title>
      <ProductContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${title}`}></img>
        </ImageContainer>
        <Info>
          <InfoItem>{`Description: ${title}`}</InfoItem>
          <InfoItem>{`Category: ${category}`}</InfoItem>
          <InfoItem>{`Price: ${price}`}</InfoItem>
          {colors && (
            <SelectMaterial
              label="Color"
              currentValue={color}
              values={colors}
              handleChange={getProductDetails}
            />
          )}
          <Button onClick={addProductToCart}>Add to cart</Button>
        </Info>
      </ProductContainer>
    </Fragment>
  )
}

export default Product
