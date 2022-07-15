// This page is the "Sign Up" page from our HTML/CSS site, 
// for the weekly/monthly (TBD?) sign up for volunteers to pick their roles
import React, {useState} from 'react';
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
import RadioButtonsRoles from '../components/signup/rolesRadio.js';
import FindSundays from '../components/signup/newSignUp/getSaturdays.js';
import Divider from "@mui/material/Divider";
import FindTuesdays from '../components/signup/newSignUp/getTuesdays.js';

//import daysInMonth from '../components/signup/currentTime.js';



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

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const theme = createTheme();

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

export default function SignUp() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  var d = new Date();
  var month = d.toLocaleString("en-US", { month: "long" })
  var getTot = daysInMonth(d.getMonth(),d.getFullYear()); //Get total days in a month
  var sat_label = new Array();   //Declaring array for inserting Saturdays
  var sat_value = new Array();
  var tues_label = new Array();   //Declaring array for inserting Tuesdays
  var tues_value = new Array();

  for(var i=1;i<=getTot;i++){    //looping through days in month
    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
    if(newDate.getDay()==6){   //if Saturday
        sat_label.push(i);
        sat_value.push(d.getFullYear() + "-" + (d.getMonth()+1) + "-" + i)
        //  day/month/year
    }
  }

  // let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  // let time = current.toLocaleTimeString();
  // setDate(date + " " + time);

  for(var i=1;i<=getTot;i++){    //looping through days in month
    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
    if(newDate.getDay()==2){   //if Tuesday
        tues_label.push(i);
        tues_value.push(d.getFullYear() + "-" + (d.getMonth()+1) + "-" + i)
        //  day/month/year
    }
  }

  // driver selections
  const [driverDay1, setDriverDay1] = useState("");
  const [driverDay2, setDriverDay2] = useState("");
  const [driverDay3, setDriverDay3] = useState("");
  const [driverDay4, setDriverDay4] = useState("");
  const [driverMoreDelivery, setDriverMoreDelivery] = useState("");
  const [driverOutsideDurham, setDriverOutsideDurham] = useState("");
  const [driver_preference, setDriverPreference] = useState("");
  const [driverTime, setDriverTime] = useState("");
  // const [driverTime915, setDriverTime915] = useState("");
  // const [driverTime930, setDriverTime930] = useState("");
  // const [driverTime945, setDriverTime945] = useState("");
  // const [driverTime10, setDriverTime10] = useState("");
  // const [driverTime1015, setDriverTime1015] = useState("");
  // const [driverTime1030, setDriverTime1030] = useState("");
  // const [driverTime1045, setDriverTime1045] = useState("");

  // // packer selections
  const [packerDay1, setPackerDay1] = useState("");
  const [packerDay2, setPackerDay2] = useState("");
  const [packerDay3, setPackerDay3] = useState("");
  const [packerDay4, setPackerDay4] = useState("");

  // // caller selections
  // let [callerDay, setCallerDay] = useState([]);
  const [callerDay1, setCallerDay1] = useState("");
  const [callerDay2, setCallerDay2] = useState("");
  const [callerDay3, setCallerDay3] = useState("");
  const [callerDay4, setCallerDay4] = useState("");

  // handle submit for driver
  const handleSubmitDriver=(event)=>{ 
    event.preventDefault()
    setDriverDay1('')
    setDriverDay2('')
    setDriverDay3('')
    setDriverDay4('')
    setDriverMoreDelivery('')
    setDriverOutsideDurham('')
    setDriverPreference('')
    setDriverTime('')
    // setDriverTime915('')
    // setDriverTime930('')
    // setDriverTime945('')
    // setDriverTime10('')
    // setDriverTime1015('')
    // setDriverTime1030('')
    // setDriverTime1045('')
  }

  // handle submit for packer
  const handleSubmitPacker=(event)=>{ 
      event.preventDefault()
      setPackerDay1('')
      setPackerDay2('')
      setPackerDay3('')
      setPackerDay4('')
  }

  // // handle submit for caller
  const handleSubmitCaller=(event)=>{ 
    event.preventDefault()
    // setCallerDay('')
    setCallerDay1('')
    setCallerDay2('')
    setCallerDay3('')
    setCallerDay4('')
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
            Monthly Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>

            <form noValidate method = "post" action="http://127.0.0.1:5000/signup">
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
                > Please mark your availability: 
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} 
                      name="driverDay1"
                      label={month + " " + sat_label[0]}
                      value={sat_value[0]}
                      onChange={(e)=>setDriverDay1(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay2"
                      label={month + " " + sat_label[1]}
                      value={sat_value[1]}
                      onChange={(e)=>setDriverDay2(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay3"
                      label={month + " " + sat_label[2]}
                      value={sat_value[2]}
                      onChange={(e)=>setDriverDay3(e.target.value)}/>
                  <FormControlLabel control={<Checkbox />}
                      name="driverDay4"
                      label={month + " " + sat_label[3]}
                      value={sat_value[3]}
                      onChange={(e)=>setDriverDay4(e.target.value)}/>
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


                {/* <FormLabel id="time-questions">Please select all times that you can begin driving: </FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="9:00 AM"
                        name="driverTime9"
                        value="09:00"
                        onChange={(e)=>setDriverTime9(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="9:15 AM"
                        name="driverTime915"
                        value="09:15"
                        onChange={(e)=>setDriverTime915(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="9:30 AM"
                        name="driverTime930"
                        value="09:30"
                        onChange={(e)=>setDriverTime930(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="9:45 AM"
                        name="driverTime945"
                        value="09:45"
                        onChange={(e)=>setDriverTime945(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="10:00 AM"
                        name="driverTime10"
                        value="10:00"
                        onChange={(e)=>setDriverTime10(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="10:15 AM"
                        name="driverTime1015"
                        value="10:15"
                        onChange={(e)=>setDriverTime1015(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="10:30 AM"
                        name="driverTime1030"
                        value="10:30"
                        onChange={(e)=>setDriverTime1030(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />} label="10:45 AM"
                        name="driverTime1045"
                        value="10:45"
                        onChange={(e)=>setDriverTime1045(e.target.value)}/>
                  </FormGroup> */}
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

            <form noValidate method = "post" action="http://127.0.0.1:5000/signup">
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
                  > Please mark your availability for this month: 
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} 
                        name="packerDay1"
                        label={month + " " + sat_label[0]}
                        value={sat_value[0]}
                        onChange={(e)=>setPackerDay1(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay2"
                        label={month + " " + sat_label[1]}
                        value={sat_value[1]}
                        onChange={(e)=>setPackerDay2(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay3"
                        label={month + " " + sat_label[2]}
                        value={sat_value[2]}
                        onChange={(e)=>setPackerDay3(e.target.value)}/>
                    <FormControlLabel control={<Checkbox />}
                        name="packerDay4"
                        label={month + " " + sat_label[3]}
                        value={sat_value[3]}
                        onChange={(e)=>setPackerDay4(e.target.value)}/>
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
              
              <form noValidate method = "post" action="http://127.0.0.1:5000/signup">
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
                > Please mark your availability for this month: 
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay1" 
                        label={month + " " + tues_label[0] + " - " + (tues_label[0] + 2)}
                        value={tues_value[0]}
                        onChange={(e)=>setCallerDay1(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay2" 
                        label= {month + " " + tues_label[1] + " - " + (tues_label[1] + 2)}
                        value= {tues_value[1]}
                        onChange={(e)=>setCallerDay2(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay3" 
                        label= {month + " " + tues_label[2] + " - " + (tues_label[2] + 2)}
                        value= {tues_value[2]}
                        onChange={(e)=>setCallerDay3(e.target.value)}
                        />
                    <FormControlLabel control={<Checkbox />} 
                        name="callerDay4" 
                        label= {month + " " + tues_label[3] + " - " + (tues_label[3] + 2)}
                        value= {tues_value[3]}
                        onChange={(e)=>setCallerDay4(e.target.value)}
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