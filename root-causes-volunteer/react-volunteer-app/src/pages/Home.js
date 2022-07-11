import React from 'react'
import '../styleSheets/Home.css';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <div>
        <div class="container" style={{fullWidth: "True"}}>
            <img src = "https://staticfanpage.akamaized.net/wp-content/uploads/sites/22/2018/12/vegetables.jpg" 
              alt = "fresh produce" style={{paddingTop: "10px"}}/>
            <div class="centered">
                <h1 id = "picText"> Welcome Volunteers! </h1>
            </div>
        </div>
        <div>
          <Grid 
            paddingTop= "40px"
            paddingBottom= "80px"
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