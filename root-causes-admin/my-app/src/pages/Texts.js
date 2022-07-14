import "./Texts.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { FooterContainer } from '../containers/footer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SvgEllipse from "../symbolComponents/Ellipse";
import {Caught_Participants} from "../components/Caught_Participants.js"

const baseUrl = "http://127.0.0.1:5000";

export function BasicSelect() {
  const [status, setStatus] = React.useState('');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <div className="basic-select">
      <Box sx={{ maxWidth: 200,}}>
      <div className = "filter">
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Filter</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            sx={{backgroundColor: "#f9f8e1" }}
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
          <Button variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default function Texts(){
    const [value, setValue] = React.useState('');
    const [participantsList, setParticipantsList] = useState([]);
    const [openA, setOpenA] = React.useState(true);
    const [openB, setOpenB] = React.useState(true);


  // GET PARTICIPANTS
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants/group/A`); // GET PATIENTS READY FOR DELIVERY (GREEN)
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data);
  };


  const handleClickA = () => {
    setOpenA(!openA);
  };

  const handleClickB = () => {
    setOpenB(!openB);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };


  const [status, setStatus] = React.useState('');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  //const [status, setStatus] = React.useState(props.participant.status);
  // const handleStatusChange = (event: SelectChangeEvent) => {
  //   setStatus(event.target.value);
  // };

    return(
        <div>
        <Navbar/>
        <h2>SMS Texting</h2>
        <div className="sms">
          <div className="box">
          <h3> Sending Messages </h3>
            <div className= "sending">
              <BasicSelect />
              <div className="messaging">
              <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor: "#f9f8e1"},
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
                  <Button variant="contained"> Confirm Message </Button>
                </div>
              </div>
            </div>
            {/* <div className= "selected_pts">
              <h3>Participants Go Here</h3>
            </div> */}
        </div>

        <div className= "box2">
          <h3> Receiving Messages </h3>
          <div className="receiving">
            <div className="caught">
             <List
              sx={{ width: '100%', bgcolor:"#f9f8e1" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Automatically Updated
                </ListSubheader>
              }
            >
            <Caught_Participants />
             {/* <ListItemButton onClick={handleClickA}>
              <SvgEllipse id="text_status"/>
                <ListItemText primary=" Pt A" />
                {openA ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openA} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className= "sublist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Message" />
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
              <ListItemButton onClick={handleClickA}>
               <SvgEllipse id="text_status"/>
                <ListItemText primary="Pt B" />
                {openA ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openA} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className= "sublist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Message" />
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
              <ListItemButton onClick={handleClickA}>
               <SvgEllipse id="text_status"/>
                <ListItemText primary="Pt C" />
                {openA ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openA} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className= "sublist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Message" />
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
              </Collapse> */}
            </List>
          </div>
          <div className="uncaught">
            <List
              sx={{ width: '100%', bgcolor:"#f9f8e1" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Needs Review
                </ListSubheader>
              }
            >
            {/* list */}
              <ListItemButton onClick={handleClickB}>
               <SvgEllipse id="text_status"/>
                <ListItemText primary="Pt D" />
                {openB ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {/* sublist */}
              <Collapse in={openB} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className= "sublist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Message" />
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
              {/* list */}
              <ListItemButton onClick={handleClickB}>
               <SvgEllipse id="text_status"/>
                <ListItemText primary="Pt E" />
                {openB ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {/* sublist */}
              <Collapse in={openB} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className= "sublist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Message" />
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
              {/* list */}
              <ListItemButton onClick={handleClickB}>
               <SvgEllipse id="text_status"/>
                <ListItemText primary="Pt F" />
                {openB ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {/* sublist */}
              <Collapse in={openB} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className= "sublist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Message" />
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
            </List>
          </div>
          </div>
        </div>
        </div>
        </div>
    );
}
