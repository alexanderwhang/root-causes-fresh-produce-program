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


const baseUrl = "http://localhost:5000";

export function Caught_Participants(props) {
  // this const handles participant status changes
    const [status, setStatus] = React.useState();
    const [statusDisplay, setStatusDisplay] = useState(props.participant.status);
  //this const is used as the state for the collapsable list
    const [open, setOpen] = React.useState(true);


  // sets states when status is changed
    const handleStatusChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      setStatus(event.target.value);
      setStatusDisplay(event.target.value);
      updatePt(event.target.value);
    };

  // the function responsible for changing the status. takes in the status chosen by user 
  // and posts it to database
    function updatePt (ptStatus) {
      console.log("update: ", ptStatus);
      let new_participant = props.participant;

      new_participant.status = ptStatus;

      var data = JSON.stringify({ participant: new_participant });
      let id = props.participant.id;

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
        // error catching
        .catch(function(error) {
          console.log(error);
        });
    }

  // when you click on a list item, it expands to show the sublist
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

  // variables that will allow us to check for conditions that permit automatic status change
    const affirmatives = ["yes", "si", "sí", "sure"];
    const negatives = ["no"]
  // variable with participant's name
    const FULLNAME = props.participant.first_name + " " + props.participant.last_name


  {
  //conditions that are easy to use for automatic status changes
        // in the future could include more options, such as "not this week", "yes please", etc.
    if (
      props.participant.sms_response.toLowerCase() == "yes" ||
      props.participant.sms_response.toLowerCase() == "si" ||
      // props.participant.sms_response.toLowerCase() == "Si" ||
      props.participant.sms_response.toLowerCase() == "sí" ||
      props.participant.sms_response.toLowerCase() == "no"
    ) {
    //changes the status of participants with affirmative responses
      { if (affirmatives.includes(props.participant.sms_response.toLowerCase()) && props.participant.status != 1) {
        console.log("affirmative")
        setStatus(1);
        setStatusDisplay(1);
        updatePt(1);
      }}
    //changes the status of participants with negative responses
      { if (negatives.includes(props.participant.sms_response.toLowerCase()) && props.participant.status != 2) {
        console.log("negative")
        setStatus(2);
        setStatusDisplay(2);
        updatePt(2);
      }}
      return (
        <div>
        {/* list item displays status and participant full name, while the collapsable item shows participant response */}
          <ListItemButton onClick={handleClick}>
            <div
              style={{
                color: `${statusMap.get(statusDisplay)}`,
              }}
            >
              <SvgEllipse id="text_status" />
            </div>
            <ListItemText primary={FULLNAME} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        {/* collapsable list item with response */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="sublist">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={props.participant.sms_response} />

              {/* the following is the code for a status changing feature. Since this component handles status
                  changes automatically, this feature is not completely necessary. However, we will leave it commented out below
                    just in case it could be useful in the future */}
                      {/* <Box sx={{ width: 100, maxWidth: 300 }}>
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
                            <MenuItem value={0}>No Status Set</MenuItem>
                            <MenuItem value={1}>Ready for Delivery</MenuItem>
                            <MenuItem value={2}>Not This Week</MenuItem>
                            <MenuItem value={3}>Requires Follow Up</MenuItem>
                          </Select>
                        </FormControl>
                      </Box> */}
              </ListItemButton>
            </List>
          </Collapse>
        </div>
      );
    }
  }
}
