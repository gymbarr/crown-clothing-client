import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const BasicSelect = (props) => {
  const { label, currentValue, values, handleOnChange } = props

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={currentValue} onChange={(event) => handleOnChange(event.target.value)} label={label}>
        {values.map((value) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default BasicSelect
