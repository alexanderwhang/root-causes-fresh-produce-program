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

export default function PackerRole() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };
  return (
    <Container 
        component="main" 
        maxWidth="xs"
        style={{paddingBottom: "15px"}}>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Box sx={{ minWidth: 370 }}>
          <FindSundays />
        </Box> 
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