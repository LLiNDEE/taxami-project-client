import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComponent = ({ label, value, children, ...props }) => {

    return(
        <FormControl fullWidth >
            <InputLabel id="simple-select-label">{label}</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={value}
                {...props}
            >
                {children}
            </Select>
        </FormControl>
    )

}

export default SelectComponent
