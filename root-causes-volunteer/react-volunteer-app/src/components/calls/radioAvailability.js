import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
 
export default function RadioButtonsAvailability() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };

    return (
        <FormControl noValidate onSubmit={handleSubmit}>
            <FormLabel id="radio-buttons-availability">Availability?</FormLabel>
            <RadioGroup
            aria-labelledby="radio-buttons-availability"
            name="radio-buttons-group"
            >
            <FormControlLabel value="available" control={<Radio />} label="Available" />
            <FormControlLabel value="noResponse" control={<Radio />} label="No Response" />
            <FormControlLabel value="notAvailable" control={<Radio />} label="Not Available" />
            </RadioGroup>
        
        <Button
            style={{backgroundColor: "#00743e"}}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Submit
        </Button>
        </FormControl>
 );
}
