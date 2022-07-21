import React from 'react';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { faBuildingColumns, faUser, faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

          <Typography component="h1" variant="h5" style={{paddingBottom: "20px"}}>
            <b>Profile</b>
          </Typography>
          <Box
          sx={{
            alignItems: 'right',
            border: 'solid',
            borderWidth: '3px',
            borderColor: '#009a4b',
            width: '360px',
            paddingLeft: "10px",
            backgroundColor: `rgba(249, 248, 225, 0.50)`,
          }}
          >
          
          <Typography 

                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "17px"}}>
                  <FontAwesomeIcon size="lg" color='#009a4b' icon={faUser} />
                  <b> Name: </b> Blue Devil
                  
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "17px"}}>
                  <FontAwesomeIcon size="lg" color='#009a4b' icon={faEnvelope} />
                  <b> Email: </b> blue_devil1@duke.edu
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "17px"}}>
                  <FontAwesomeIcon size="lg" color='#009a4b' icon={faPhone} />
                  <b> Phone: </b> 123-456-7890
          </Typography>

          <Typography 
                  
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "17px"}}>
                  <FontAwesomeIcon size="lg" color='#009a4b' icon={faBuildingColumns} />
                  <b> Duke Affiliation: </b> Duke Undergrad
          </Typography>

          <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px", paddingBottom: "20px",
                  color: "black", fontSize: "17px"}}>
                  <FontAwesomeIcon size="lg" color='#009a4b' icon={faGlobe} />
                  <b> Non-English Languages: </b> Spanish 
          </Typography>
        
        </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
