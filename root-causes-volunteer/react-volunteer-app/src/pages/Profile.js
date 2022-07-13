// This page is for people to start their profile, so this would include the
// "Sign Up" and "Profile Set Up" section from our HTML/CSS website
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
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// reference participant.js in components file

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

export default function Profile() {
  
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [first_time, setFirstTime] = useState("");
  const [credit, setCredit] = useState("");
  const [hipaa, setHipaa] = useState("");

  const handleSubmit=(event)=>{ 
    event.preventDefault()
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setPhone('')
    setLanguage('')
    setAffiliation('')
    setFirstTime('')
    setCredit('')
    setHipaa('')
  }
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{paddingBottom: "30px"}}>
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
            <ContactsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
          <form noValidate method = "post" action="http://127.0.0.1:5000/volunteers">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={first_name}
                  onChange={(e)=>setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="last_name"
                  value={last_name}
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name = "phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="new-phone"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-affiliation">Duke Affiliation</InputLabel>
                    <Select
                      name="affiliation"
                      labelId="select-affiliation"
                      id="affiliation"
                      value={affiliation}
                      label="Duke Affiliation"
                      onChange={(e)=>setAffiliation(e.target.value)}
                    >
                      <MenuItem value={"duke_undergrad"}>Duke Undergrad</MenuItem>
                      <MenuItem value={"duke_schoolofmed"}>Duke School of Medicine</MenuItem>
                      <MenuItem value={"duke_fuqua"}>Duke Fuqua School of Business</MenuItem>
                      <MenuItem value={"duke_law"}>Duke School of Law</MenuItem>
                      <MenuItem value={"duke_nicholas"}>Duke Nicholas School of the Environment</MenuItem>
                      <MenuItem value={"duke_sanford"}>Duke Sanford School of Public Policy</MenuItem>
                      <MenuItem value={"duke_pratt"}>Duke Pratt School of Engineering</MenuItem>
                      <MenuItem value={"duke_emergencymed"}>Duke Emergency Medicine</MenuItem>
                      <MenuItem value={"duke_ghi"}>Duke Global Health Institute</MenuItem>
                      <MenuItem value={"duke_alum"}>Duke Alum</MenuItem>
                      <MenuItem value={"duke_sa"}>Duke Student Affairs</MenuItem>
                      <MenuItem value={"duke_athlethics"}>Duke Athletics</MenuItem>
                      <MenuItem value={"duke_facstaff"}>Duke Faculty/Staff</MenuItem>
                      <MenuItem value={"duke_trinity"}>Trinity School of Arts and Sciences</MenuItem>
                      <MenuItem value={"meredith"}>Meredith College</MenuItem>
                      <MenuItem value={"jldoc"}>JLDOC</MenuItem>
                      <MenuItem value={"activategood"}>Activate Good</MenuItem>
                      <MenuItem value={"duke_alum"}>Duke Alum</MenuItem>
                      <MenuItem value={"connectcommunity"}>Connect Community</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-language">Non-English Language</InputLabel>
                    <Select
                      name="language"
                      labelId="select-language"
                      id="language"
                      value={language}
                      label="Non-English Language"
                      onChange={(e)=>setLanguage(e.target.value)}
                      >    
                        <MenuItem value={"none"}>NONE</MenuItem>
                        <MenuItem value={"ASL"}>ASL</MenuItem>
                        <MenuItem value={"Arabic"}>Arabic</MenuItem>
                        <MenuItem value={"Bangla"}>Bangla</MenuItem>
                        <MenuItem value={"Cantonese"}>Cantonese</MenuItem>
                        <MenuItem value={"French"}>French</MenuItem>
                        <MenuItem value={"German"}>German</MenuItem>
                        <MenuItem value={"Greek"}>Greek</MenuItem>
                        <MenuItem value={"Hindi"}>Hindi</MenuItem>
                        <MenuItem value={"Italian"}>Italian</MenuItem>
                        <MenuItem value={"Japanese"}>Japanese</MenuItem>
                        <MenuItem value={"Malayalam"}>Malayalam</MenuItem>
                        <MenuItem value={"Mandarin"}>Mandarin</MenuItem>
                        <MenuItem value={"Marathi"}>Marathi</MenuItem>
                        <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
                        <MenuItem value={"Pujabi"}>Pujabi</MenuItem>
                        <MenuItem value={"Russian"}>Russian</MenuItem>
                        <MenuItem value={"Sinhala"}>Sinhala</MenuItem>
                        <MenuItem value={"Spanish"}>Spanish</MenuItem>
                        <MenuItem value={"Telugu"}>Telugu</MenuItem>
                        <MenuItem value={"Swahili"}>Swahili</MenuItem>
                        <MenuItem value={"Pujabi"}>Pujabi</MenuItem>
                        <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="radio-buttons-volunteer">Are you a first time volunteer?</FormLabel>
                    <RadioGroup
                      aria-labelledby="radio-buttons-volunteer"
                      name="first_time"
                      onChange={(e)=>setFirstTime(e.target.value)}
                    >
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="credit">Are you volunteering for credit?</FormLabel>
                  <RadioGroup
                    aria-labelledby="credit"
                    name="credit"
                    onChange={(e)=>setCredit(e.target.value)}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="hipaa">Have you completed the HIPAA training?</FormLabel>
                    <RadioGroup
                      aria-labelledby="hipaa"
                      name="hipaa"
                      onChange={(e)=>setHipaa(e.target.value)}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="Yes" />
                      <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              style={{backgroundColor: "#00743e"}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Register
            </Button>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" style={{color: "#00743e"}}>
                  Already have an account? Login Here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}