import { FormInputLabel, Input, Group } from './form-input.styles'

const FormInput = ({ label, ...otherProps }) => (
  <Group>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Input {...otherProps} />
    {label && (
    <FormInputLabel shrink={otherProps.value.length}>
      {label}
    </FormInputLabel>
    )}
  </Group>
)

export default FormInput
