import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Below are the imports used to make the radio buttons work (FormControlLabel is above that was already in use)
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//Below is for the dropdown
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useRadioGroup } from '@mui/material/RadioGroup';
import FindSundays from './getSaturdays.js';

export default function DriverRole() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };
  return (
    <Container 
        component="main" 
        maxWidth="xs"
        style={{paddingBottom: "30px"}}>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
    <FormControl>
       <FindSundays />
        <br />
        <Grid item xs={12}>
        <Typography 
          component="h2" 
          variant="h3" 
          style={{color: "#00743e", fontSize: "25px", textAlign: "left"}}
          >
            If you are volunteering as a driver, please answer the following:
        </Typography>
        </Grid>
        <br />
        <Grid item xs={12}>
        <FormLabel id="driver-questions">Driving Preferences:</FormLabel>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="I am willing to deliver to a few more patients if needed (up to ~1 extra hour)!" />
                <FormControlLabel control={<Checkbox />} label="Living outside of Durham?" />
             </FormGroup>
        </Grid>
        <br />
        <Grid item xs={12}>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel 
                variant="standard" 
                htmlFor="uncontrolled-native"
                style={{fontSize: "21px"}}>
                Route Preference:
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'route-preference',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10}>Closer with more deliveries</option>
                <option value={20}>More distant with fewer deliveries</option>
                <option value={30}>No preference</option>
              </NativeSelect>
            </FormControl>
          </Box>
          </Grid>
          <br />
          <Grid item xs={12}>
          <FormControl>
          <FormLabel id="time-questions">Please select all times that you can begin driving: </FormLabel>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="9:00 AM" />
                <FormControlLabel control={<Checkbox />} label="9:15 AM" />
                <FormControlLabel control={<Checkbox />} label="9:30 AM" />
                <FormControlLabel control={<Checkbox />} label="9:45 AM" />
                <FormControlLabel control={<Checkbox />} label="10:00 AM" />
                <FormControlLabel control={<Checkbox />} label="10:15 AM" />
                <FormControlLabel control={<Checkbox />} label="10:30 AM" />
                <FormControlLabel control={<Checkbox />} label="10:45 AM" />
            </FormGroup>
          </FormControl>
          </Grid>
    </FormControl>
    </Grid>
    <Button
        style={{backgroundColor: "#00743e"}}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
        Save
    </Button>
    </Box>
    </Container>

  );
}
// <BpRadio for the other type of radio button