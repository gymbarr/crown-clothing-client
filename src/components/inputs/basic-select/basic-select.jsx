import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const BasicSelect = (props) => {
  const { label, currentValue, values, setValue } = props

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={currentValue} onChange={handleChange} label={label}>
        {values.map((value) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default BasicSelect
