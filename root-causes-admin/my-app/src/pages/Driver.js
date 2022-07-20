import "./Driver.css";
import React from "react";
import axios from "axios";
// import { Table } from "../Table";
import { Vol_data } from "../vol_data";
import Navbar from "../components/Navbar/Navbar";
import { FooterContainer } from "../containers/footer";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SvgEllipse from "../symbolComponents/Ellipse";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CSVLink } from "react-csv";
import ParseExcel from "../components/ParseExcel.js"
import { styled } from '@mui/material/styles';

// localhost:5000 tells you if your backend is connected to the host
const baseUrl = "http://127.0.0.1:5000";


export function Driver() {
  // first two constants get volunteer and participant list
  const [participantsList, setParticipantsList] = useState([]);
  const [volunteersList, setVolunteersList] = useState([]);
  // tells you if the collapsable table is open or closed
  const [open, setOpen] = React.useState(true);

  const headers = [{ label: "Address", key: "address" }];

  // grabs the csv file
  const csvReport = {
    filename: "Participant Addresses",
    headers: headers,
    data: participantsList,
  };
  const handleClick = () => {
    setOpen(!open);
  };

  // makes sure drivers match the volunteer list as well as the number of green participants
    let numDrivers = volunteersList.length;
    let numParticipants = participantsList.length;

  // const fileUpload = () => {
  //   <Input accept="file/*" id="contained-button-file" multiple type="file"/>
  // };


  // editInfo allows a hidden field to appear onClick
  const [edit_form_status, setEdit] = React.useState(true)

  const editInfo = () => {
    if (edit_form_status){
      setEdit(false);
    }
      
    else if (!edit_form_status){
      setEdit(true);
    }
  };

  // GET PARTICIPANTS
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants/group/A/status/1`); // GET PATIENTS READY FOR DELIVERY (GREEN)
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data);
  };

  // GET DRIVERS
  const fetchVolunteers = async () => {
    const data = await axios.get(`${baseUrl}/volunteers/drivers/2022-07-09`); // GET DRIVERS AVAILABLE FOR DELIVERY
    const { volunteers } = data.data;
    setVolunteersList(volunteers);
    console.log("DATA: ", data);
  };


  useEffect(() => {
    fetchParticipants();
    fetchVolunteers();
  }, []);


  const Input = styled('input')({
  display: 'none',
  });
// map that each status color corresponds to
// in the future, we'd like to implement the admin's FULL color-coding system which is a lot more than just these 4 colors
  let statusMap = new Map([
    [0, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"],
  ]);

    // allows "upload routes" button to first select a pdf and then make the collapsable table display
      const handleFile = (e) => {
          console.log(e.target.files[0]);
          editInfo();
      }
  
  // shows volunteer driver and participant information
  return (
    <div className="drivers">
      <Navbar />
      <h1>Driver Management</h1>
      <div className="before_assign">
        <div className="driver_vols">
          <h3>Drivers</h3>
          <h4> Total: {numDrivers} </h4>
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Language</th>
                {/* might want distance and time columns */}
              </tr>
              {volunteersList.map((vol) => {
                  return (
                    <tr key={vol.volunteer_id}>
                      <td> {vol.first_name}</td>
                      <td>{vol.last_name}</td>
                      <td>{vol.phone}</td>
                      <td>{vol.language}</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
        <div className="delivery_pts">
          <h3> Participants </h3>
          <h4> Total: {numParticipants} </h4>
          <table>
            <tbody>
              <tr>
                <th>Status</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Language</th>
                <th>Group</th>
              </tr>
              {/* returns any participants for said week whose status is green, meaning they are good to receive their delivery */}
              {participantsList.map((participant) => {
                return (
                  <tr key={participant.id}>
                    <td>
                      <div
                        style={{
                          color: `${statusMap.get(participant.status)}`,
                        }}
                      >
                        {/* only participants with green status will be shown in the table */}
                        <SvgEllipse />
                      </div>
                    </td>
                    <td> {participant.first_name}</td>
                    <td>{participant.last_name}</td>
                    <td>{participant.address}</td>
                    <td>{participant.language}</td>
                    <td>{participant.group}</td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="driver_buttons">
        {/* <form onSubmit={handleSubmit}> */}
        {/* <hi>Download Addresses</hi> */}
        {/* <input type="file" onChange={handleChange} /> */}

        {/* buttons with variant=contained are from mui and make it so that the buttons will have a background color */}
        <Button variant="contained">

          {/* this button allows a csv of participant data to be downloaded onClick */}
          <CSVLink {...csvReport} id="csv-link">
            Download Addresses
          </CSVLink>
        </Button>
        {/* <Button type="submit" variant="contained"> */}
        {/* <Button variant="contained">
          <ParseExcel/> */}

        {/* this <label> tag allows a user to upload a file (particularly an excel file of the addresses) when you click the Upload Routes button */}
        {/* then, once a file is selected, a collapsable table will appear */}
        <label htmlFor="contained-button-file"> 
      <Input accept="file/*" id="contained-button-file" multiple type="file" onChange={(e) => handleFile(e)}/>
        <Button
          variant="contained" 
          component="span"
          id="upload">
            Upload Routes
        </Button>
        </label>
      </div>
      <form hidden={edit_form_status}>
      <div className="after_assign">
      {/* our collapsable table is from mui */}
        <List
          sx={{ width: "100%", bgcolor: "#f9f8e1" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            
            <ListSubheader component="div" id="nested-list-subheader">
              Assigned Routes
            </ListSubheader>
          }
          className="indiv_routes"
        >

      {/* due to time constraints, this table is currently HARDCODED and not connected to the database */}
      {/* and also not generated by an algorithm */}
      {/* however, the information we have listed is ideally what the admins at Root Causes would like displayed: */}
      {/* that is, route, start time, duration, stops & total bags */}
        <ListItemButton onClick={handleClick}>
                    <ListItemText> Ulla	Bracchi </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          Start Time: 9:00, Route: A, Duration: 60 min, Stops: 2, Total Bags: 12
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText> Theda Tozer </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          Start Time: 9:15, Route: B, Duration: 60 min, Stops: 2, Total Bags: 10
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText> Cristin Caustic </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          Start Time: 9:30, Route: C, Duration: 55 min, Stops: 2, Total Bags: 6
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText> Chrissy Nicholas </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          Start Time: 9:45, Route: D, Duration: 45 min, Stops: 1, Total Bags: 3
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText> Nero	Pledger </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          Start Time: 10:00, Route: E, Duration: 80 min, Stops: 3, Total Bags: 10
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={handleClick}>
                    <ListItemText> Angelia Shapter </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          Start Time: 10:15, Route: F, Duration: 30 min, Stops: 1, Total Bags: 4
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>


          {/* {volunteersList.map((vol) => {
              return (
                <div key={vol.id}>
                  <ListItemButton key={vol.id} onClick={handleClick}>
                    <ListItemText>{vol.first_name} {vol.last_name} </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </div>
              );
          })} */}
        </List>
      </div>
      {/* currently our confirm routes button doesn't do anything */}
      {/* but ideally, we'd like it to send the volunteer route information to the volunteer app through our shared database */}
        <div className="driver_buttons">
          <Button variant="contained"> Confirm Routes </Button>
        </div>
      </form>
      <FooterContainer />
    </div>
  );
}
