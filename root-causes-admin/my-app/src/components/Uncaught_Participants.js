// USED IN TEXTS.SMS
// Component for participants whose texts are more complicated
// for us to automatically sort, so these will have to be manually changed

import React from "react";
import "../pages/Texts.css";
import SvgEllipse from "../symbolComponents/Ellipse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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

//database connection 
const baseUrl = "http://localhost:5000";

export function Uncaught_Participants(props) {
  // this const handles participant status changes
    const [status, setStatus] = React.useState();
    const [statusDisplay, setStatusDisplay] = useState(props.participant.status);
  //this const is used as the state for the collapsable list
    const [open, setOpen] = React.useState(true);

  // sets states when status is changed. this is also where the new status is written to the database
    const handleStatusChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      setStatus(event.target.value);
      setStatusDisplay(event.target.value);

      let new_participant = props.participant;

      new_participant.status = event.target.value;

      var data = JSON.stringify({ participant: new_participant });
      let id = props.participant.id;
      // setStatusDisplay(new_participant.status);

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
    };

  const handleClick = () => {
    setOpen(!open);
  };

  //database has numbers as statuses, this maps them to the corresponding color 
    let statusMap = new Map([
      [0, "grey"],
      [1, "green"],
      [2, "tan"],
      [3, "salmon"],
    ]);

  {
  //filters out any responses that will be caught by "caught_participants" so that we are only left 
    // with the more complex answers
    if (
      props.participant.sms_response != "Yes" &&
      props.participant.sms_response != "Si" &&
      props.participant.sms_response != "Si" &&
      props.participant.sms_response != "sí" &&
      props.participant.sms_response != "Sí" &&
      props.participant.sms_response != "No"
    ) {
      return (
        <div>
        {/* list item displays status and participant full name, while the collapsable item shows participant response */}
          <ListItemButton onClick={handleClick}>
            <div
              style={{
                color: `${statusMap.get(statusDisplay)}`,
              }}
            >
            {/* circle with color status, changes color when status is changed */}
              <SvgEllipse id="text_status" />
            </div>
          {/* participant name */}
            <ListItemText primary={`${props.participant.first_name} ${props.participant.last_name} `}/>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        {/* collapsable list with response */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="sublist">
              <ListItemButton sx={{ pl: 4 }}>
              {/* participant SMS response: */}
                <ListItemText primary={props.participant.sms_response} />
              {/* box tags contain the status changing dropdown */}
                <Box sx={{ minWidth: 150, maxWidth: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-status-label">Status</InputLabel>
                    <Select
                      labelId="simple-select-label"
                      id="simple-select"
                      sx={{ backgroundColor: "#f9f8e1" }}
                      value={status}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                    {/* status options */}
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
      );
    }
  }
}
