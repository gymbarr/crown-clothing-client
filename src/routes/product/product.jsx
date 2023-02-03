import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { getProduct, getProductVariants } from "../../utils/api/products"
import { selectCartItems } from "../../store/cart/cart-selector"
import { addItemToCart } from "../../store/cart/cart-action"

import Button from "../../components/button/button"
import SelectMaterial from "../../components/material-ui/select-material/select-material"
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
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [sizes, setSizes] = useState([])
  const [variants, setVariants] = useState([])
  const cartItems = useSelector(selectCartItems)

  const { title, imageUrl, category, price, colors } = product

  useEffect(() => {
    getProduct(productCategory, productId).then((response) =>
      setProduct(response.data)
    )
  }, [])

  useEffect(() => {
    if (!color) return

    const attributes = { color: color }
    getProductVariants(productCategory, productId, attributes).then(
      (response) => setVariants(response.data)
    )
  }, [color])

  useEffect(() => {
    if (!variants) return

    setSizes(variants.map((variant) => variant.size).sort())
  }, [variants])

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
            <InfoItem>
              <SelectMaterial
                label="Color"
                currentValue={color}
                values={colors}
                setValue={setColor}
              />
            </InfoItem>
          )}
          {sizes && (
            <InfoItem>
              <SelectMaterial
                label="Size"
                currentValue={size}
                values={sizes}
                setValue={setSize}
              />
            </InfoItem>
          )}
          <Button onClick={addProductToCart}>Add to cart</Button>
        </Info>
      </ProductContainer>
    </Fragment>
  )
}

export default Product
