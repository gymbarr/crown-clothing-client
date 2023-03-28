import Switch from '@mui/material/Switch'

const BasicSwitch = (props) => {
  const { leftLabel, rightLabel, handleOnSwitch } = props

  return (
    <>
      {leftLabel}
      <Switch color="default" onChange={handleOnSwitch} />
      {rightLabel}
    </>
  )
}

export default BasicSwitch
