import React from "react";
// import { Individual } from "./App";
import {useNavigate} from "react-router-dom";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import NativeSelect from "@mui/material/NativeSelect";
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import Ellipse from './symbols/Ellipse.svg';
import SvgEllipse from './symbolComponents/Ellipse';
import {useEffect, useState} from 'react';
import axios from "axios"

const baseUrl = "http://localhost:5000"

export const Table = ({data}) => {
  const [participantsList, setParticipantsList] = useState([]);

  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(participantsList);
  const [tableFilter, setTableFilter] = useState([]);
  
  const filterData = (e) => {
  if(e.target.value !== ""){
  setValue(e.target.value);
  const filterTable = dataSource.filter(o=>Object.keys(o).some(k=>
  String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
  setTableFilter([...filterTable])
  } else{
  setValue(e.target.value);
  setDataSource([...dataSource]);
  }
  }

  // GET
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants`);
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data)
  }

  useEffect(() => {
    fetchParticipants();
  }, [])


  const navigate = useNavigate();

  // const [value, setValue] = React.useState("no-color");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  let statusMap = new Map ([
    [0, "grey"],
    [4, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"]
  ])

  return (
    <table class="pt_list">
      <tbody>
        <tr>
          <th>Status</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Language</th>
          <th>Group</th>
        </tr>
        {participantsList.map((participant) => {
          return (
            <tr key={participant.id}>
              <td> 
                <div style={{color: `${statusMap.get(participant.status)}`}}>
                <SvgEllipse />
                </div>
              </td>
              <td> 
                <Button
                  id="pt_button" onClick ={()=>{
                  navigate("/individual/" + participant.id);
                }} >{participant.first_name}
                </Button>
              </td>
              <td>{participant.last_name}</td>
              <td>{participant.address}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.language}</td>
              <td>{participant.group}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

