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
import Button from '@mui/material/Button';
import '../styleSheets/tableRoute.css';
import PeopleIcon from '@mui/icons-material/People';

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

export default function EitherOr() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit=(event)=>{ 
        event.preventDefault()
        setEmail('')
        setPassword('')
  }

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
              <PeopleIcon />
            </Avatar>
  
            <Typography component="h1" variant="h5">
              Are you Admin or Volunteer?
            </Typography>

            <Typography component="h1" variant="h5">
              Select which role you are to be taken to the appropriate site. 
            </Typography>
            
            <div id="btn-group">
            <Button
              href='/'
              id = 'volunteer-btn'
              style={{backgroundColor: "#00743e", marginRight: "10px", width: "150px"}}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 3, }}
              onSubmit={handleSubmit}
            >
              Volunteer
            </Button>

            <Button
              id = 'admin-btn'
              style={{backgroundColor: "#00743e", width: "150px"}}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Admin
            </Button>
            </div>
  
            {/* <Typography 
                    component="h2" 
                    variant="h3" 
                    style={{textAlign: "left", paddingTop: "20px",
                    color: "black", foßntSize: "20px", fontWeight: "bold",}}>
                    Created:
            </Typography> */}
            
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }