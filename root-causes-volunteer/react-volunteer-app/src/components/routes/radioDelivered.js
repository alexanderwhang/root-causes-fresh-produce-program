import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
 
// radio buttons handling delivery status of food to participants
// volunteers will go onto the "Routes" page and mark "Delivered" once a participant has recieved their food for the week

export default function RadioButtonsAvailability() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  return (
   <FormControl noValidate onSubmit={handleSubmit}>
     <FormLabel id="radio-buttons-availability"></FormLabel>
     <RadioGroup
       aria-labelledby="radio-buttons-availability"
       name="radio-buttons-group"
     >
       <FormControlLabel value="available" control={<Radio />} label="Delivered" />
     </RadioGroup>
     <Button
          style={{backgroundColor: "#00743e"}}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Submit
      </Button>
   </FormControl>
 );
}
