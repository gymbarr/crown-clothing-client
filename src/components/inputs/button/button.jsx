import { BaseButton, InvertedButton, ButtonSpinner } from './button.styles'

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType])

const Button = ({
  children, buttonType, isLoading, ...otherProps
}) => {
  const CustomButton = getButton(buttonType)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  )
}

export default Button
