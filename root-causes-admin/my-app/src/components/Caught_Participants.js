
// USED IN TEXTS.SMS
  // Component for participants whose texts have been automatically sorted
  // by our API and will have their status automatically changed


import React from "react";
import "../pages/Texts.css";
import SvgEllipse from "../symbolComponents/Ellipse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
// import { Container, Wrapper, Row, Column, Link, Title } from './styles/footer'

// const baseUrl = "http://127.0.0.1:5000";
const baseUrl = "http://localhost:5000";

export function Caught_Participants() {
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(true);
    const [caughtParticipants, setCaughtParticipants] = useState([]);

    // GET PARTICIPANTS
    const fetchParticipants = async () => {
      const data = await axios.get(`${baseUrl}/participants/group/A`); // GET PATIENTS WITH DESIRED ANSWERS
      const participants = data.data.participants;
      setCaughtParticipants(participants);
      console.log("DATA: ", data);
    };

    useEffect(() => {
    fetchParticipants();
    }, []);

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

    const handleClick = () => {
    setOpen(!open);
    };

    let statusMap = new Map([
        [0, "grey"],
        [1, "green"],
        [2, "tan"],
        [3, "salmon"],
      ]);

    return (
      <div>
      {caughtParticipants.map((participant) => {
        return (
          <div>
        <ListItemButton onClick={handleClick}>
          <div
            style={{
              color: `${statusMap.get(participant.status)}`,
            }}
          >
          <SvgEllipse id="text_status"/>
          </div>
          <ListItemText primary= {participant.first_name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className= "sublist">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary= {participant.sms_response} />
                  <Box sx={{ width:100, maxWidth: 300 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-status-label">Status</InputLabel>
                        <Select
                          labelId="simple-select-label"
                          id="simple-select"
                          sx={{backgroundColor: "#f9f8e1" }}
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
              </ListItemButton>
            </List>
          </Collapse>
          </div>
      )})}
          </div>
    );
}