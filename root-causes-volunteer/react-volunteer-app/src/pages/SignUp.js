// This page is the "Sign Up" page from our HTML/CSS site, 
// for the monthly sign up for volunteers to pick their roles
import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// This is the page for volunteers to sign up monthly for the roles they
// would like to serve in!

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.rootcauseshealth.org/">
        Root Causes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

export default function SignUp() {
  // create a new day
  var d = new Date();

  // first day in the next month
  if (d.getMonth() === 11 ) {
    var d_next_month = new Date(d.getFullYear() + 1, 0, 1);
    var d_next2_month = new Date(d.getFullYear() + 1, 1, 1);
  } else if (d.getMonth() === 10) {
    var d_next_month = new Date(d.getFullYear(), 11, 1);
    var d_next2_month = new Date(d.getFullYear() + 1, 0, 1);
  } else {
    var d_next_month = new Date(d.getFullYear(), d.getMonth()+1, 1);
    var d_next2_month = new Date(d.getFullYear() + 1, d.getMonth() + 2, 1);
  }

  var getTot = daysInMonth(d.getMonth(),d.getFullYear()); //Get total days in a month
  var getTotNext = daysInMonth(d_next_month.getMonth(), d_next_month.getFullYear());
  var getTotNext2 = daysInMonth(d_next2_month.getMonth(), d_next2_month.getFullYear());

  var sat_label = new Array();   //Declaring array for inserting Saturdays
  var sat_value = new Array();
  var tues_label = new Array();   //Declaring array for inserting Tuesdays
  var tues_value = new Array();

// TO FIND SATURDAYS
  for(var i=1;i<=getTot;i++){    //looping through days in current month
    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
    if(i >= d.getDate() && newDate.getDay()==6){   //if Saturday
        sat_label.push(newDate.toLocaleString("en-US", { month: "long" }) + " " + i)
        sat_value.push(d.getFullYear() + "-" + (d.getMonth()+1) + "-" + i)
        //  day/month/year
    }
  }

  for(var i=1;i<=getTotNext;i++){ //looping through days in following month
    if (d.getMonth() + 1 > 11) {
      var num = d.getMonth() - 11
      var newDate = newDate(d.getFullYear()+1, num, i)
    } else {
      var newDate = new Date(d.getFullYear(),d.getMonth()+1,i)
    }
    if(newDate.getDay()==6){   //if Saturday
        sat_label.push(newDate.toLocaleString("en-US", { month: "long" }) + " " + i);
        sat_value.push(newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + i) //  day/month/year format
    }
  }

  for(var i=1;i<=getTotNext2;i++){ //looping through days in 2 months away
    if (d.getMonth() + 2 > 11) {
      var num = d.getMonth() - 10
      var newDate = newDate(d.getFullYear()+1, num, i)
    } else {
      var newDate = new Date(d.getFullYear(),d.getMonth()+2,i)
    }
    if(newDate.getDay()==6){   //if Saturday
        sat_label.push(newDate.toLocaleString("en-US", { month: "long" }) + " " + i);
        sat_value.push(newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + i) //  day/month/year format
    }
  }

// TO FIND TUESDAYS
  for(var i=1;i<=getTot;i++){    //looping through days in current month
    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
    if(i >= d.getDate() && newDate.getDay()==2){   //if Tuesday
        tues_label.push(newDate.toLocaleString("en-US", { month: "long" }) + " " + i);
        tues_value.push(d.getFullYear() + "-" + (d.getMonth()+1) + "-" + i)
        //  day/month/year
    }
  }

  for(var i=1;i<=getTotNext;i++){    //looping through days in following month
    if (d.getMonth() + 1 > 11) {
      var num = d.getMonth() - 11
      var newDate = newDate(d.getFullYear()+1, num, i)
    } else {
      var newDate = new Date(d.getFullYear(),d.getMonth()+1,i)
    }
    if(newDate.getDay()==2){   //if Tuesday
      tues_label.push(newDate.toLocaleString("en-US", { month: "long" }) + " " + i);
      tues_value.push(d.getFullYear() + "-" + (d.getMonth()+2) + "-" + i) //  day/month/year
    }
  }

    for(var i=1;i<=getTotNext2;i++) {    //looping through days in following month
    var newDate = new Date(d.getFullYear(),d.getMonth()+2,i)
    if (d.getMonth() + 2 > 11) {
      var num = d.getMonth() - 10
      var newDate = newDate(d.getFullYear()+1, num, i)
    } else {
      var newDate = new Date(d.getFullYear(),d.getMonth()+2,i)
    }
    if(newDate.getDay()==2){   //if Tuesday
      tues_label.push(newDate.toLocaleString("en-US", { month: "long" }) + " " + i);
      tues_value.push(d.getFullYear() + "-" + (d.getMonth()+3) + "-" + i) //  day/month/year
    }
  }

  // set color of checkbox to grey if the day has already passed!
  // function disable(str) {
  //   const arr = str.split(" ")
  //   const num = parseInt(arr[arr.length - 1]);
  //   if (num < d.getDate()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // driver selections
  const [driverDay1, setDriverDay1] = useState("");
  const [driverDay2, setDriverDay2] = useState("");
  const [driverDay3, setDriverDay3] = useState("");
  const [driverDay4, setDriverDay4] = useState("");
  const [driverDay5, setDriverDay5] = useState("");
  const [driverDay6, setDriverDay6] = useState("");
  const [driverDay7, setDriverDay7] = useState("");
  const [driverDay8, setDriverDay8] = useState("");
  const [driverMoreDelivery, setDriverMoreDelivery] = useState("");
  const [driverOutsideDurham, setDriverOutsideDurham] = useState("");
  const [driver_preference, setDriverPreference] = useState("");
  const [driverTime, setDriverTime] = useState("");

  // // packer selections
  const [packerDay1, setPackerDay1] = useState("");
  const [packerDay2, setPackerDay2] = useState("");
  const [packerDay3, setPackerDay3] = useState("");
  const [packerDay4, setPackerDay4] = useState("");
  const [packerDay5, setPackerDay5] = useState("");
  const [packerDay6, setPackerDay6] = useState("");
  const [packerDay7, setPackerDay7] = useState("");
  const [packerDay8, setPackerDay8] = useState("");

  // // caller selections
  const [callerDay1, setCallerDay1] = useState("");
  const [callerDay2, setCallerDay2] = useState("");
  const [callerDay3, setCallerDay3] = useState("");
  const [callerDay4, setCallerDay4] = useState("");
  const [callerDay5, setCallerDay5] = useState("");
  const [callerDay6, setCallerDay6] = useState("");
  const [callerDay7, setCallerDay7] = useState("");
  const [callerDay8, setCallerDay8] = useState("");

  // handle submit for driver
  const handleSubmitDriver=(event)=>{ 
    event.preventDefault()
    setDriverDay1('')
    setDriverDay2('')
    setDriverDay3('')
    setDriverDay4('')
    setDriverDay5('')
    setDriverDay6('')
    setDriverDay7('')
    setDriverDay8('')
    setDriverMoreDelivery('')
    setDriverOutsideDurham('')
    setDriverPreference('')
    setDriverTime('')
  }

  // handle submit for packer
  const handleSubmitPacker=(event)=>{ 
      event.preventDefault()
      setPackerDay1('')
      setPackerDay2('')
      setPackerDay3('')
      setPackerDay4('')
      setPackerDay5('')
      setPackerDay6('')
      setPackerDay7('')
      setPackerDay8('')
  }

  // // handle submit for caller
  const handleSubmitCaller=(event)=>{ 
    event.preventDefault()
    setCallerDay1('')
    setCallerDay2('')
    setCallerDay3('')
    setCallerDay4('')
    setCallerDay5('')
    setCallerDay6('')
    setCallerDay7('')
    setCallerDay8('')
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
            <AssignmentOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Volunteer Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>

{/* Driver Form Questions */}

            <form noValidate method = "post" action="http://127.0.0.1:5000/signup/driver">
              <Grid item xs={12}>
                <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{color: "#00743e", fontSize: "20px", fontWeight: "bold",
                  textAlign: "center", backgroundColor: "#f9f8e1"}}>
                  Fill out the form that corresponds to the role you would like to serve in!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Driver
                </Typography>
              </Grid>
              <Grid item xs={12}>
              <FormLabel id="day-questions" 
                > Please mark your availability for the following list of dates: 
                <FormGroup>
                  
                  <FormControlLabel control={<Checkbox />} 
                      name="driverDay1"
                      label={sat_label[0]}
                      value={sat_value[0]}
                      // disabled = {disable(sat_label[0])}
                      onChange={(e)=>setDriverDay1(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay2"
                      label={sat_label[1]}
                      value={sat_value[1]}
                      // disabled = {disable(sat_label[1])}
                      onChange={(e)=>setDriverDay2(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay3"
                      label={sat_label[2]}
                      value={sat_value[2]}
                      // disabled = {disable(sat_label[2])}
                      onChange={(e)=>setDriverDay3(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay4"
                      label={sat_label[3]}
                      value={sat_value[3]}
                      // disabled = {disable(sat_label[3])}
                      onChange={(e)=>setDriverDay4(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay5"
                      label={sat_label[4]}
                      value={sat_value[4]}
                      onChange={(e)=>setDriverDay5(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay6"
                      label={sat_label[5]}
                      value={sat_value[5]}
                      onChange={(e)=>setDriverDay5(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay7"
                      label={sat_label[6]}
                      value={sat_value[6]}
                      onChange={(e)=>setDriverDay6(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay8"
                      label={sat_label[7]}
                      value={sat_value[7]}
                      onChange={(e)=>setDriverDay8(e.target.value)}/>
                </FormGroup>  
              </FormLabel>
          
              </Grid>
              <br />

              <Grid item xs={12}>
                <FormLabel id="driver-questions">Driving Preferences:</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="I am willing to deliver to a few more patients if needed (up to ~1 extra hour)!" 
                        name="driverMoreDelivery"
                        value="moreDelivery"
                        onChange={(e)=>setDriverMoreDelivery(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="Living outside of Durham?"
                        name="driverOutsideDurham"
                        value="outsideDurham"
                        onChange={(e)=>setDriverOutsideDurham(e.target.value)}/>
                  </FormGroup>
              </Grid>
              
              
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="radio-buttons-drive-preference">Route Preference:</FormLabel>
                    <RadioGroup
                      aria-labelledby="radio-buttons-drive-preference"
                      name="driver_preference"
                      onChange={(e)=>setDriverPreference(e.target.value)}
                    >
                      <FormControlLabel value="Closer with more deliveries" control={<Radio />} 
                          label="Closer with more deliveries" />
                      <FormControlLabel value="More distant with fewer deliveries" control={<Radio />} 
                          label="More distant with fewer deliveries" />
                      <FormControlLabel value="No preference" control={<Radio />} 
                          label="No preference" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              
              
              <Grid item xs={12}>
              <FormControl>
                  <FormLabel id="time-questions">Please select all times that you can begin driving:</FormLabel>
                    <RadioGroup
                      aria-labelledby="radio-buttons-time-preference"
                      name="driver_time"
                      onChange={(e)=>setDriverTime(e.target.value)}
                    >
                      <FormControlLabel value="09:00" control={<Radio />} 
                          label="9:00 AM" />
                      <FormControlLabel value="09:15" control={<Radio />} 
                          label="9:15 AM" />
                      <FormControlLabel value="09:30" control={<Radio />} 
                          label="9:30 AM" />
                      <FormControlLabel value="09:45" control={<Radio />} 
                          label="9:45 AM" />
                      <FormControlLabel value="10:00" control={<Radio />} 
                          label="10:00 AM" />
                      <FormControlLabel value="10:15" control={<Radio />} 
                          label="10:15 AM" />
                      <FormControlLabel value="10:30" control={<Radio />} 
                          label="10:30 AM" />
                    </RadioGroup>
                </FormControl>

            </Grid>
            <Grid item xs={12}>
              <Button
                style={{backgroundColor: "#00743e"}}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmitDriver}
              >
                Submit
              </Button>
            </Grid>
            </form>

{/* Packer Form Questions */}

            <form noValidate method = "post" action="http://127.0.0.1:5000/signup/packer">
              <Grid item xs={12}>
                <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Packer
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="day-questions" 
                  > Please mark your availability for the following list of dates: 
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} 
                        name="packerDay1"
                        label={sat_label[0]}
                        value={sat_value[0]}
                        // disabled = {disable(sat_label[0])}
                        onChange={(e)=>setPackerDay1(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay2"
                        label={sat_label[1]}
                        value={sat_value[1]}
                        // disabled = {disable(sat_label[1])}
                        onChange={(e)=>setPackerDay2(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay3"
                        label={sat_label[2]}
                        value={sat_value[2]}
                        // disabled = {disable(sat_label[2])}
                        onChange={(e)=>setPackerDay3(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay4"
                        label={sat_label[3]}
                        value={sat_value[3]}
                        // disabled = {disable(sat_label[3])}
                        onChange={(e)=>setPackerDay4(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} 
                        name="packerDay5"
                        label={sat_label[4]}
                        value={sat_value[4]}
                        onChange={(e)=>setPackerDay5(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay6"
                        label={sat_label[5]}
                        value={sat_value[5]}
                        onChange={(e)=>setPackerDay6(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay7"
                        label={sat_label[6]}
                        value={sat_value[6]}
                        onChange={(e)=>setPackerDay7(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay8"
                        label={sat_label[7]}
                        value={sat_value[7]}
                        onChange={(e)=>setPackerDay8(e.target.value)}/>
                  </FormGroup>  
                </FormLabel>
                
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{backgroundColor: "#00743e"}}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onChange={handleSubmitPacker}
                >
                  Submit
                </Button>
              </Grid>
              </form>
              
{/* Caller Form Questions */}

              <form noValidate method = "post" action="http://127.0.0.1:5000/signup/caller">
              <Grid item xs={12}>
                <Typography 
                  component="h2" 
                  variant="h3" 
                  style={{textAlign: "left", paddingTop: "20px",
                  color: "black", fontSize: "20px", fontWeight: "bold",}}>
                  Caller
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
              <FormLabel id='caller_day'
                > Please mark your availability for the following list of dates: 
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay1" 
                        label={tues_label[0]}
                        value={tues_value[0]}
                        // disabled = {disable(tues_label[0])}
                        onChange={(e)=>setCallerDay1(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay2" 
                        label= {tues_label[1]}
                        value= {tues_value[1]}
                        // disabled = {disable(tues_label[1])}
                        onChange={(e)=>setCallerDay2(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay3" 
                        label= {tues_label[2]}
                        value= {tues_value[2]}
                        // disabled = {disable(tues_label[2])}
                        onChange={(e)=>setCallerDay3(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay4" 
                        label= {tues_label[3]}
                        value= {tues_value[3]}
                        // disabled = {disable(tues_label[3])}
                        onChange={(e)=>setCallerDay4(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay5" 
                        label= {tues_label[4]}
                        value= {tues_value[4]}
                        onChange={(e)=>setCallerDay5(e.target.value)}
                      />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay6" 
                        label= {tues_label[5]}
                        value= {tues_value[5]}
                        onChange={(e)=>setCallerDay6(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay7" 
                        label= {tues_label[6]}
                        value= {tues_value[6]}
                        onChange={(e)=>setCallerDay7(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay8" 
                        label= {tues_label[7]}
                        value= {tues_value[7]}
                        onChange={(e)=>setCallerDay8(e.target.value)}
                      />
                </FormGroup>
                </FormLabel>  
              </Grid>
              
              <Grid item xs={12} style = {{paddingBottom: "15px"}}>
                <Button
                  style={{backgroundColor: "#00743e"}}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onChange={handleSubmitCaller}
                >
                  Submit
                </Button>
              </Grid>
            </form>

            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}