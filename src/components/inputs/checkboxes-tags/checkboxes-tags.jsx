import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

function CheckboxesTags(props) {
  const {
    label, options, selectedOptions, handleOnChange,
  } = props

  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      onChange={(event, values) => handleOnChange(values)}
      value={selectedOptions}
      // eslint-disable-next-line no-shadow
      renderOption={(props, option, { selected }) => (
        option && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
        )
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...params} label={label} placeholder={label} size="small" />
      )}
    />
  )
}

export default CheckboxesTags
