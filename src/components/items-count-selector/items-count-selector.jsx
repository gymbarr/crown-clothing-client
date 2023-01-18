import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import { SelectorContainer, Label } from "./items-count-selector.styles"

const ItemsCountSelector = (props) => {
  const { currentItemsPerPage, setItemsPerPage, values } = props

  // if (currentItemsPerPage === setItemsPerPage) return

  const handleChangeItemsCount = (event, newItemsCount) => {
    if (currentItemsPerPage === newItemsCount || !newItemsCount) return

    setItemsPerPage(+newItemsCount)
  }

  return (
    <SelectorContainer>
      <Label>Show by</Label>
      <ToggleButtonGroup
        color="primary"
        value={currentItemsPerPage.toString()}
        exclusive
        onChange={handleChangeItemsCount}
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
