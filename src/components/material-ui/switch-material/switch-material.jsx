import Switch from "@mui/material/Switch"
import { Fragment } from "react"


const SwitchMaterial = (props) => {
  const { leftLabel, rightLabel, handleOnSwitch } = props

  return (
    <Fragment>
      {leftLabel}
      <Switch color="default" onChange={handleOnSwitch} />
      {rightLabel}
    </Fragment>
  )
}

export default SwitchMaterial
