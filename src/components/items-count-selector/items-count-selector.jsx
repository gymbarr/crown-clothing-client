import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import { SelectorContainer, Label } from "./items-count-selector.styles"

const ItemsCountSelector = (props) => {
  const { itemsPerPage, setItemsPerPage, setActivePage } = props

  const handleChangeItemsCount = (event, newItemsCount = "20") => {
    setItemsPerPage(+newItemsCount)
    setActivePage(1)
  }

  return (
    <SelectorContainer>
      <Label>Show by</Label>
      <ToggleButtonGroup
        color="primary"
        value={itemsPerPage.toString()}
        exclusive
        onChange={handleChangeItemsCount}
        aria-label="Show by"
      >
        <ToggleButton value="20">20</ToggleButton>
        <ToggleButton value="50">50</ToggleButton>
        <ToggleButton value="100">100</ToggleButton>
      </ToggleButtonGroup>
    </SelectorContainer>
  )
}

export default ItemsCountSelector
