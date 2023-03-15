import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { getProduct, getProductVariants } from "../../utils/api/products"
import { selectCartItems } from "../../store/cart/cart-selector"
import { addItemToCart } from "../../store/cart/cart-action"

import Button from "../../components/inputs/button/button"
import BasicSelect from "../../components/inputs/basic-select/basic-select"
import {
  Title,
  ProductContainer,
  ImageContainer,
  Info,
  InfoItem,
  VariantRequiredText,
} from "./product.styles"

const Product = () => {
  const dispatch = useDispatch()
  const { productCategory, productId } = useParams()
  const [product, setProduct] = useState({})
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [variants, setVariants] = useState([])
  const [variantRequired, setVariantRequired] = useState(false)
  const cartItems = useSelector(selectCartItems)
  const { title, imageUrl, category, price, colors } = product
  const sizes = variants.map((variant) => variant.size)


  useEffect(() => {
    getProduct(productCategory, productId).then((response) =>
      setProduct(response.data)
    )
  }, [productId])

  const handleOnChangeColor = (selectedColor) => {
    if (!selectedColor) return

    setColor(selectedColor)
    setSize("")
    const attributes = { color: selectedColor }
    getProductVariants(productCategory, productId, attributes).then(
      (response) => setVariants(response.data)
    )
  }

  const handleOnChangeSize = (selectedSize) => {
    if (!selectedSize) return

    setSize(selectedSize)
  }

  const handleAddProductToCart = () => {
    if (color && size) {
      const selectedVariant = variants.find(
        (variant) => variant.color === color && variant.size === size
      )
      dispatch(addItemToCart(cartItems, selectedVariant))
    } else {
      setVariantRequired(true)
      setTimeout(() => setVariantRequired(false), 2000)
    }
  }

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
              <BasicSelect
                label="Color"
                currentValue={color}
                values={colors}
                handleOnChange={handleOnChangeColor}
              />
            </InfoItem>
          )}
          {sizes && (
            <InfoItem>
              <BasicSelect
                label="Size"
                currentValue={size}
                values={sizes}
                handleOnChange={handleOnChangeSize}
              />
            </InfoItem>
          )}
          {variantRequired && (
            <VariantRequiredText>
              Please choose a color and a size
            </VariantRequiredText>
          )}
          <Button onClick={handleAddProductToCart}>Add to cart</Button>
        </Info>
      </ProductContainer>
    </Fragment>
  )
}

export default Product
