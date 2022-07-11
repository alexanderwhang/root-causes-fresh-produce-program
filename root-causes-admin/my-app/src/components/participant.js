import React from "react";
import SvgEllipse from "../symbolComponents/Ellipse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
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
  
//   const [participantsList, setParticipantsList] = useState([]);
    const [statusColor, setStatusColor] = useState(props.participant.status);


  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    

    let new_participant = props.participant
    new_participant.status = status
    var data = JSON.stringify({participant: new_participant});
    let id = props.participant.id
    setStatusColor(new_participant.status)
      
      var config = {
        method: 'put',
        url: `http://localhost:5000/participants/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
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
                color: `${statusMap.get(statusColor)}`, //set color in state
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
          <td>5</td>
          <td>she/her/hers</td>
          <td>56</td>
          <td>Caucasian</td>
        </tr>
      </table>
      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <form onSubmit={handleSubmitStatus} id={props.participant.id}>
            <input type="hidden" name="id" value={props.participant.id} />
            <InputLabel id="select-status-label">Status</InputLabel>
            <Select
              defaultValue={{
                label: "test",
                value: props.participant.status,
              }}
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
            <Button type="submit" value={props.participant.id}>
              Submit
            </Button>
          </form>
        </FormControl>
      </Box>
    </div>
  );
}

export default Participant;
