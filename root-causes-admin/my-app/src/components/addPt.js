import React from "react";
// import "../App.css"
// import "./Participant.css";
// import SvgEllipse from "../symbolComponents/Ellipse";
import "./addPt.css";
// import SvgEllipse from "../symbolComponents/Ellipse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
// import { Container, Wrapper, Row, Column, Link, Title } from './styles/footer'

// const baseUrl = "http://127.0.0.1:5000";
const baseUrl = "http://localhost:5000";

function NewParticipant() {
  let statusMap = new Map([
    [0, "grey"],
    [4, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"],
  ]);


  const [status, setStatus] = React.useState(0);
  const [group, setGroup] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [household_size, setHouseSize] = React.useState(0);
  const [pronouns, setPronouns] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState(0);
  const [apartment, setApartment] = React.useState('');


  //   const [participantsList, setParticipantsList] = useState([]);
//   const [statusDisplay, setStatusDisplay] = useState(props.participant.status);
//   const [groupDisplay, setGroupDisplay] = useState(props.participant.group);
//   const [languageDisplay, setLanguageDisplay] = useState(props.participant.language);
//   const [householdSizeDisplay, setHouseholdSizeDisplay] = useState(props.participant.household_size);
//   const [pronounsDisplay, setPronounsDisplay] = useState(props.participant.pronouns);
//   const [ageDisplay, setAgeDisplay] = useState(props.participant.age);
//   const [emailDisplay, setEmailDisplay] = useState(props.participant.email);
//   const [phoneDisplay, setPhoneDisplay] = useState(props.participant.phone);
//   const [streetDisplay, setStreetDisplay] = useState(props.participant.street);
//   const [cityDisplay, setCityDisplay] = useState(props.participant.city);
//   const [stateDisplay, setStateDisplay] = useState(props.participant.state);
//   const [zipDisplay, setZipDisplay] = useState(props.participant.zip);
//   const [apartmentDisplay, setApartmentDisplay] = useState(props.participant.apartment);
//   const[addressDisplay, setAddressDisplay] = useState(props.participant.address);


  
  //HANDLE CHANGE
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  const handleGroupChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value);
  };
  const handleHouseSizeChange = (event: SelectChangeEvent) => {
    setHouseSize(event.target.value);
  };
  const handlePronounChange = (event: SelectChangeEvent) => {
    setPronouns(event.target.value);
  };
  const handleAgeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleEmailChange = (event: SelectChangeEvent) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: SelectChangeEvent) => {
    setPhone(event.target.value);
  };
  const handleStreetChange = (event: SelectChangeEvent) => {
    setStreet(event.target.value);
  };
  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };
  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };
  const handleZipChange = (event: SelectChangeEvent) => {
    setZip(event.target.value);
  };
  const handleApartmentChange = (event: SelectChangeEvent) => {
    setApartment(event.target.value);
  };

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    editInfo();

    console.log(pronouns);
    let new_participant = {};

    new_participant.status = status;
    new_participant.group = group;
    new_participant.language = language;
    new_participant.household_size = household_size;
    new_participant.pronouns = pronouns;
    new_participant.age = age;
    new_participant.email = email;
    new_participant.phone = phone;
    new_participant.street = street;
    new_participant.city = city;
    new_participant.state = state;
    new_participant.zip = zip;
    new_participant.apartment = apartment;

    var data = JSON.stringify({ participant: new_participant });
    // setStatusDisplay(new_participant.status);
    // setGroupDisplay(new_participant.group);
    // setLanguageDisplay(new_participant.language);
    // setHouseholdSizeDisplay(new_participant.household_size);
    // setPronounsDisplay(new_participant.pronouns);
    // setAgeDisplay(new_participant.age);
    // setEmailDisplay(new_participant.email);
    // setPhoneDisplay(new_participant.phone);
    // setStreetDisplay(new_participant.street);
    // setCityDisplay(new_participant.city);
    // setStateDisplay(new_participant.state);
    // setZipDisplay(new_participant.zip);
    // setApartmentDisplay(new_participant.apartment);
    let address_string = "";
    if(!new_participant.apartment) {
      address_string = `${new_participant.street} ${new_participant.city}, ${new_participant.state} ${new_participant.zip}`
    } else {
      address_string = `${new_participant.street} ${new_participant.city}, ${new_participant.state} ${new_participant.zip} Apt. ${new_participant.apartment}`

    }
    // setAddressDisplay(address_string);

    var config = {
      method: "post",
      url: `http://localhost:5000/participants`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });

  };

  const [edit_form_status, setEdit] = React.useState(true)

  const editInfo = () => {
    if (edit_form_status){
      setEdit(false);
    }
      
    else if (!edit_form_status){
      setEdit(true);
    }
  };

  return (
    <div>
        <h1>Add New Participant</h1>
      <form onSubmit={handleSubmit} hidden={false}>
        {/* STATUS */}
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="select-status-label">Status</InputLabel>
            <Select
              labelId="select-status-label"
              id="select-status"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={0}>No Status Set</MenuItem>
              <MenuItem value={1}>Ready for Delivery</MenuItem>
              <MenuItem value={2}>Not This Week</MenuItem>
              <MenuItem value={3}>Requires Follow Up</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* EMAIL */}
    <div class="text-inputs">
      <div>
        <TextField
          className="email-input"
          id="filled-email-input"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
        <div></div>
        {/* PHONE  NUMBER */}
      <div class="phoneNumber">
        <TextField
          id="filled-password-input"
          label="Phone Number"
          type="phone-number"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
        {/* ADDRESS */}
      <div>
        <TextField id="filled-password-input" label="Street" type="street" value={street} onChange={handleStreetChange} />
      </div>
      <div>
        <TextField id="filled-password-input" label="City" type="city" value={city} onChange={handleCityChange} />
      </div>
      <div>
        <TextField id="filled-password-input" label="State" type="state" value={state} onChange={handleStateChange} />
      </div>
      <div>
        <TextField
          id="filled-password-input"
          label="Zip Code"
          type="zip-code"
          value={zip}
          onChange={handleZipChange}
        /> 
      </div>
      <div>
        <TextField
          id="filled-password-input"
          label="Apartment Number"
          type="apartment-number"
          value={apartment}
          onChange={handleApartmentChange}
        />
      </div>
    </div>
        
        {/* LANGUAGE */}
      <div class="language-input">
        <Box sx={{ maxWidth: 200 }} className="language">
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Language</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={language}
              label="Status"
              onChange={handleLanguageChange}
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Spanish"}>Spanish</MenuItem>
            </Select>
          </FormControl>
          <div></div>
        </Box>
      </div>

        {/* GROUP */}
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Group</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={group}
              label="Status"
              onChange={handleGroupChange}
            >
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"B"}>B</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* HOUSEHOLD SIZE */}
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Household Size</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={household_size}
              label="Status"
              onChange={handleHouseSizeChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              {/* <MenuItem value={11}>10+</MenuItem> */}
            </Select>
          </FormControl>
        </Box>

        {/* PRONOUNS */}
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Pronouns</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={pronouns}
              label="Pronouns"
              onChange={handlePronounChange}
            >
              <MenuItem value={"she/her/hers"}>she/her/hers</MenuItem>
              <MenuItem value={"he/him/his"}>he/him/his</MenuItem>
              <MenuItem value={"they/them/theirs"}>they/them/theirs</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
              <MenuItem value={"Prefer Not to Share"}>
                Prefer Not to Share
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      <div class="age-input">
        <TextField
          id="outlined-number"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={age}
          onChange={handleAgeChange}
        />
      </div>
        <div></div>
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Race/Ethnicty</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={"Hispanic or Latino"}>Hispanic or Latino</MenuItem>
              <MenuItem value={"American Indian or Alaskan Native"}>American Indian or Alaskan Native</MenuItem>
              <MenuItem value={"Asian"}>Asian</MenuItem>
              <MenuItem value={"Native Hawaiian or Other Pacific Islander"}>
                Native Hawaiian or Other Pacific Islander
              </MenuItem>
              <MenuItem value={4}>Black or African American</MenuItem>
              <MenuItem value={5}>White</MenuItem>
              <MenuItem value={6}>Other</MenuItem>
            </Select>
          </FormControl>
          <div></div>
        </Box>
        <div className="submit_button">
          <Button variant="contained" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default NewParticipant;
