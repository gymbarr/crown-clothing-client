import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import { SelectorContainer, Label } from "./items-count-selector.styles"

const ItemsCountSelector = (props) => {
  const { currentItemsPerPage, values, handleOnChange } = props

  return (
    <SelectorContainer>
      <Label>Show by</Label>
      <ToggleButtonGroup
        color="primary"
        value={currentItemsPerPage.toString()}
        exclusive
        onChange={(event, value) => handleOnChange(value)}
        aria-label="Show by"
      >
        {values.map((value) => (
          <ToggleButton key={value} value={`${value}`}>{value}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </SelectorContainer>
  )
}

export default ItemsCountSelector
