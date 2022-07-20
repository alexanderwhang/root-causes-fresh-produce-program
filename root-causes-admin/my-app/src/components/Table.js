import "../App.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import SvgEllipse from '../symbolComponents/Ellipse';
import {useEffect, useState} from 'react';
import axios from "axios"
import TextField from "@mui/material/TextField";

const baseUrl = "http://localhost:5000"

export const Table = () => {
  const [participantsList, setParticipantsList] = useState([]);
  const [value, setValue] = useState("");
  // const [dataSource, setDataSource] = useState(participantsList);
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if(e.target.value !== ""){
      setValue(e.target.value);
      const filterTable = participantsList.filter(o=>Object.keys(o).some(k=>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
          setTableFilter([...filterTable])
    } else{
      setValue(e.target.value);
      setParticipantsList([...participantsList]);
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

  let statusMap = new Map ([
    [0, "grey"],
    [4, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"]
  ])

  return (
    <div>
    <div id="search">
          <TextField
            id="searchField"
            label="Search"
            value={value}
            onChange={filterData}
            type="search"
          />
    </div>
      <div className="send-texts">
            <Button
              onClick={() => {
                navigate("/smstexts");
              }}
              variant="contained"
              sx={{backgroundColor:"#d6a977"}}
            >
              Send Texts
            </Button>
               <Button
              onClick={() => {
                navigate("/addPt");
              }}
              variant="contained"
              sx={{backgroundColor:"#d6a977"}}
            >
              Add Participant
            </Button>
            
          </div>
    <div className="container1">
    <table class="pt_list">
      <thead>
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
        </thead>
        <tbody>
        {(value.length > 0) ? tableFilter.map((participant) => {
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
                }}>{participant.first_name}
                </Button>
              </td>
              <td>{participant.last_name}</td>
              <td>{participant.address}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.language}</td>
              <td>{participant.group}</td>
            </tr>
          )
        })
        :
        participantsList.map((participant) => {
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
          )
        })
} 
        </tbody>
          </table>
          </div>
          </div>
          );
        }
    
