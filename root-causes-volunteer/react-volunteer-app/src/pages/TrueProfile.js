import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import PhoneInput from 'react-phone-number-input/input';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Root Causes
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

export default function TrueProfile() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ m: 1, bgcolor: "#009a4b" }}>
            <AccountCircleIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Profile
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  User:
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Email:
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Created:
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Bio:
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Admin:
          </Typography>
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}