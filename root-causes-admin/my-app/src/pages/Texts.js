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
  const [value, setValue] = React.useState("");
  const [message, setMessage] = React.useState("");
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setMessage(event.target.value);
  };

  const handleOutgoingSMS = async (e) => {
    var data = JSON.stringify({ message });

    const response = await axios.post(`${baseUrl}/smstexts/${message}`);
  };

  const [status, setStatus] = React.useState("");

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  //const [status, setStatus] = React.useState(props.participant.status);
  // const handleStatusChange = (event: SelectChangeEvent) => {
  //   setStatus(event.target.value);
  // };

  return (
    <div>
      <Navbar />
      <h2>SMS Texting</h2>
      <div className="sms">
        <div className="box">
          <h3> Sending Messages </h3>
          <div className="sending">
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
              <div className="confirmMessage">
                <header className="sendSMS">
                  <Button variant="contained" onClick={handleOutgoingSMS}>
                    {" "}
                    Send Message{" "}
                  </Button>
                </header>
              </div>
            </div>
          </div>
        </div>

        <div className="box2">
          <h3> Receiving Messages </h3>
          <div className="receiving">
            <div className="caught">
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
                {participantsList.map((participant) => {
                  return <Caught_Participants participant={participant} />;
                })}
              </List>
            </div>
            <div className="uncaught">
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
