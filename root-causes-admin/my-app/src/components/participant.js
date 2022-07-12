import React from "react";
import "./Participant.css";
import SvgEllipse from "../symbolComponents/Ellipse";
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

function Participant(props) {
  let statusMap = new Map([
    [0, "grey"],
    [4, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"],
  ]);

  console.log(props);

  const [status, setStatus] = React.useState(props.participant.status);
  const [group, setGroup] = React.useState(props.participant.group);
  const [language, setLanguage] = React.useState(props.participant.language);
  const [household_size, setHouseSize] = React.useState(
    props.participant.household_size
  );
  const [pronouns, setPronouns] = React.useState(props.participant.pronouns);

  //   const [participantsList, setParticipantsList] = useState([]);
  const [statusColor, setStatusColor] = useState(props.participant.status);

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

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let new_participant = props.participant;

    new_participant.status = status;
    new_participant.group = group;
    new_participant.language = language;
    new_participant.houseSize = household_size;
    new_participant.pronouns = pronouns;

    var data = JSON.stringify({ participant: new_participant });
    let id = props.participant.id;
    setStatusColor(new_participant.status);

    var config = {
      method: "put",
      url: `http://localhost:5000/participants/${id}`,
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

    // console.log(`Participant id: ${e.target.id}`);
    // try {
    //     console.log(baseUrl)
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     console.log(status)
    //     let body = JSON.stringify({status: status})
    //   const data = await axios.put(`${baseUrl}/participants/1`, body, config );
    //   console.log("DATA: ")
    //   console.log(data)
    //   setParticipantsList([...participantsList, data.data]);
    //   handleStatusChange("");
    //   console.log("Receive submit");
    // } catch (err) {
    //   console.error(err.message);
    //   console.log(`Participant id: ${e.target.id}`);
    // }
  };

  return (
    <div>
      <table className="personal_info">
        <tr>
          <th>Status</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Language</th>
        </tr>
        <tr>
          <td>
            <div
              style={{
                color: `${statusMap.get(statusColor)}`,
              }}
            >
              <SvgEllipse />
            </div>
          </td>
          <td>{props.participant.address}</td>
          <td>{props.participant.email}</td>
          <td>{props.participant.phone}</td>
          <td>{props.participant.language}</td>
        </tr>
        <tr>
          <th>Group</th>
          <th>Household Size</th>
          <th>Pronouns</th>
          <th>Age</th>
          <th>Race/Ethnicity</th>
        </tr>
        <tr>
          <td>{props.participant.group}</td>
          <td>{props.participant.household_size}</td>
          <td>{props.participant.pronouns}</td>
          <td>56</td>
          <td>Hispanic or Latino</td>
        </tr>
      </table>
      <form onSubmit={handleSubmit}>
        {/* STATUS */}
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="select-status-label">Status</InputLabel>
            <Select
              defaultValue={props.participant.status}
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
        <TextField
          className="email"
          id="filled-email-input"
          label="Email"
          type="email"
        />
        <div>
        </div>
        {/* PHONE  NUMBER */}
        <TextField
          id="filled-password-input"
          label="Phone Number"
          type="phone-number"
        />
        <div>
        </div>
        {/* ADDRESS */}
        <TextField id="filled-password-input" label="Street" type="street" />
        <div>
        </div>
        <TextField id="filled-password-input" label="City" type="city" />
        <div>
        </div>
        <TextField id="filled-password-input" label="State" type="state" />
        <div>
        </div>
        <TextField
          id="filled-password-input"
          label="Zip Code"
          type="zip-code"
        />
        <div>
        </div>
        <TextField
          id="filled-password-input"
          label="Apartment Number"
          type="apartment-number"
        />
        <div>
        </div>
        {/* LANGUAGE */}
        <Box sx={{ maxWidth: 200 }}>
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
          <div>
          </div>
        </Box>
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
          <div>
          </div>
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
          <div>
          </div>
        </Box>
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Pronouns</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={0}>she/her/hers</MenuItem>
              <MenuItem value={1}>he/him/his</MenuItem>
              <MenuItem value={2}>they/them/theirs</MenuItem>
              <MenuItem value={3}>Other</MenuItem>
              <MenuItem value={4}>Prefer Not to Share</MenuItem>
            </Select>
          </FormControl>
          <div>
          </div>
        </Box>
        <TextField
          id="outlined-number"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div>
        </div>
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
              <MenuItem value={0}>Hispanic or Latino</MenuItem>
              <MenuItem value={1}>American Indian or Alaskan Native</MenuItem>
              <MenuItem value={2}>Asian</MenuItem>
              <MenuItem value={3}>
                Native Hawaiian or Other Pacific Islander
              </MenuItem>
              <MenuItem value={4}>Black or African American</MenuItem>
              <MenuItem value={5}>White</MenuItem>
              <MenuItem value={6}>Other</MenuItem>
            </Select>
          </FormControl>
          <div>
          </div>
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Participant;
