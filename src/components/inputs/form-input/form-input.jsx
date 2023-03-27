import { FormInputLabel, Input, Group } from './form-input.styles'

function FormInput({ label, ...otherProps }) {
  return (
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
}

export default FormInput
