import "./Driver.css";
import React from "react";
import axios from "axios";
import { Table } from "../Table";
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

const baseUrl = "http://127.0.0.1:5000";

export function Driver() {
  const [participantsList, setParticipantsList] = useState([]);
  const [volunteersList, setVolunteersList] = useState([]);
  const [open, setOpen] = React.useState(true);

  const headers = [{ label: "Address", key: "address" }];

  const csvReport = {
    filename: "Participant Addresses",
    headers: headers,
    data: participantsList,
  };
  const handleClick = () => {
    setOpen(!open);
  };

  let numDrivers = volunteersList.length;
  let numParticipants = participantsList.length;


  // GET PARTICIPANTS
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants/group/A/status/1`); // GET PATIENTS READY FOR DELIVERY (GREEN)
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data);
  };

  // GET DRIVERS
  const fetchVolunteers = async () => {
    const data = await axios.get(`${baseUrl}/volunteers/drivers/2022-07-09`); // GET PATIENTS READY FOR DELIVERY (GREEN)
    const { volunteers } = data.data;
    setVolunteersList(volunteers);
    console.log("DATA: ", data);
  };

  useEffect(() => {
    fetchParticipants();
    fetchVolunteers();
  }, []);



  let statusMap = new Map([
    [0, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"],
  ]);

  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }
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
              {participantsList.map((participant) => {
                return (
                  <tr key={participant.id}>
                    <td>
                      <div
                        style={{
                          color: `${statusMap.get(participant.status)}`,
                        }}
                      >
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
        <Button variant="contained">
          <CSVLink {...csvReport} id="csv-link">
            Download Addresses
          </CSVLink>
        </Button>
        <Button type="submit" variant="contained">
          Upload Routes
        </Button>
        {/* </form> */}
      </div>
      <div className="after_assign">
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
          {Vol_data.map((vol) => {
            if (vol.type === "Driver")
              return (
                <div key={vol.id}>
                  <ListItemButton key={vol.id} onClick={handleClick}>
                    <ListItemText> Route {vol.route} </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="sublist">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          {" "}
                          {vol.firstName} {vol.lastName}{" "}
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </div>
              );
          })}
        </List>
      </div>
      <div className="driver_buttons">
        <Button variant="contained"> Confirm Routes </Button>
      </div>
      <FooterContainer />
    </div>
  );
}
