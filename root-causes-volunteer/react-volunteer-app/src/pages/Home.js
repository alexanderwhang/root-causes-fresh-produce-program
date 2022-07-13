import React from 'react'
import '../styleSheets/Home.css';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import volunteer from '../Root_Causes_Volunteer.png';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const Home = () => {
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var d = new Date();
  var day = days[ d.getDay() ];
  var month = months[ d.getMonth() ];

  // old image
  // "https://staticfanpage.akamaized.net/wp-content/uploads/sites/22/2018/12/vegetables.jpg" 
  

  return (
    <div>
        <br />
          <div style={{backgroundColor: "#00743e", paddingTop: "5px", paddingBottom: "2px"}}>
              <h2 style={{color: "#f9f8e1", textAlign: "center"}}> {day + " | " + month + " " + d.getDate()
              + ", " + d.getFullYear()} </h2>
          </div>
          <div class="container" style={{fullWidth: "True"}}>
            <img src = "https://static.wixstatic.com/media/508ee3_4a942c0a42444721841fb74e84b7b9a0~mv2.jpg/v1/fill/w_958,h_636,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Root%20Causes-6.jpg"
              alt = "fresh produce" style={{paddingTop: "10px"}}/>
          </div>
          <div class="container" style={{fullWidth: "True", position: "center", 
              paddingTop: "8px"}}>
              <h1 id = "picText"> Welcome Volunteers! </h1>
          </div>
          <div class="container" style={{fullWidth: "True"}}>
            <img src = {volunteer} alt = "fresh produce" />
          </div>
        <div>
          <Grid 
            paddingTop= "10px"
            paddingBottom = "85px"
            container justify="center"
            alignItems="center"
            justifyContent="center">
            <Link href="/signup" style={{textDecoration: 'none'}}>
              <Button id="volunteerRedirect"
                // size="large" 
                fullWidth
                type="submit" 
                variant="contained"
                justify="center">
                Click here to sign up for volunteering!
              </Button>
            </Link>
          </Grid>
        </div>
    </div>
  )
}

export default Home