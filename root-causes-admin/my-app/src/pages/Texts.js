import "./Texts.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { FooterContainer } from "../containers/footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SvgEllipse from "../symbolComponents/Ellipse";
import { Caught_Participants } from "../components/Caught_Participants.js";
import { Uncaught_Participants } from "../components/Uncaught_Participants.js";

const baseUrl = "http://127.0.0.1:5000";

export function BasicSelect() {
  // code that permits the selection of different filter groups
    const [status, setStatus] = React.useState("");

    const handleStatusChange = (event: SelectChangeEvent) => {
      setStatus(event.target.value);
    };

    return (
      <div className="basic-select">
        <Box sx={{ maxWidth: 200 }}>
          <div className="filter">
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Filter</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                sx={{ backgroundColor: "#f9f8e1" }}
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={0}>Group A English</MenuItem>
                <MenuItem value={1}>Group A Spanish</MenuItem>
                <MenuItem value={2}>Group B English</MenuItem>
                <MenuItem value={3}>Group B Spanish</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="submitButton">
            <Button variant="contained">Submit</Button>
          </div>
        </Box>
      </div>
    );
}

export default function Texts() {
  // gets list of participants
    const [participantsList, setParticipants] = useState([]);

    // GET PARTICIPANTS
    const fetchParticipants = async () => {
      const data = await axios.get(`${baseUrl}/participants/group/A`);
      const participants = data.data.participants;
      setParticipants(participants);
      console.log("DATA: ", data);
    };

    useEffect(() => {
      fetchParticipants();
    }, []);

  // allows us to create a message to be sent
    const [value, setValue] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setMessage(event.target.value);
  };

  // code that allows us to send the message
    const handleOutgoingSMS = async (e) => {
      var data = JSON.stringify({ message });

      const response = await axios.post(`${baseUrl}/smstexts/${message}`);
    };


  return (
    <div>
      <Navbar />
      <h2>SMS Texting</h2>
      <div className="sms">
      {/* left side of the page: send SMS texts */}
        <div className="box">
          <h3> Sending Messages </h3>
          <div className="sending">
          {/* filter form */}
            <BasicSelect />
            <div className="messaging">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "40ch",
                    backgroundColor: "#f9f8e1",
                  },
                }}
                noValidate
                autoComplete="off"
              >
              {/* message box */}
                <div className="messageBox">
                  <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    placeholder="Type message here..."
                    multiline
                    rows={8}
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              </Box>
            {/* confirm message button  */}
              <div className="confirmMessage">
                  <Button variant="contained" onClick={handleOutgoingSMS}>
                    {" "}
                    Send Message{" "}
                  </Button>
              </div>
            </div>
          </div>
        </div>
      {/* right side of sms: receiving texts*/}
        <div className="box2">
          <h3> Receiving Messages </h3>
          <div className="receiving">
          {/* "caught participants" are participants whose responses are simple enough to have their statuses automatically updated*/}
            <div className="caught">
            {/* list header */}
              <List
                sx={{ width: "100%", bgcolor: "#f9f8e1" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Automatically Updated
                  </ListSubheader>
                }
              >
              {/* dropdown in list created by the following map */}
                {participantsList.map((participant) => {
                  // caught_participants code can be found in components folder
                  return <Caught_Participants participant={participant} />;
                })}
              </List>
            </div>
          {/* "uncaught participants" have more complex responses that should be handled and verified manually */}
            <div className="uncaught">
            {/* list header */}
              <List
                sx={{ width: "100%", bgcolor: "#f9f8e1" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Needs Review
                  </ListSubheader>
                }
              >
                {participantsList.map((participant) => {
                  // uncaught_participants code found in components folder
                  return <Uncaught_Participants participant={participant} />;
                })}
              </List>
            </div>
          </div>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
}
