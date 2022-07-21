import "./Table.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import SvgEllipse from '../symbolComponents/Ellipse';
import {useEffect, useState} from 'react';
import axios from "axios"
import TextField from "@mui/material/TextField";

// FUTURE FEATURE NOTES:
    // it would be nice to have a filter function in which a specific group (A or B) or color status can be displayed 

const baseUrl = "http://localhost:5000"

// this function contains the table of all the participants, and also contains the search bar and participant page buttons
export const Table = () => {

  // get all participants
    const [participantsList, setParticipantsList] = useState([]);
    
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

  // search and filter participants 
    const [value, setValue] = useState("");
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

  // allows us to navigate to different pages (buttons and individual info)
    const navigate = useNavigate();

  // map that gets status from the database and translates it to a color
    let statusMap = new Map ([
      [0, "grey"],
      [4, "grey"],
      [1, "green"],
      [2, "tan"],
      [3, "salmon"]
    ])

  
  return (
  <div>
    {/* search field */}
      <div id="search">
            <TextField
              id="searchField"
              label="Search"
              value={value}
              onChange={filterData}
              type="search"
            />
      </div>

    {/* buttons on participant page */}
      <div className="table_buttons">
            {/* navigates to SMS texting page */}
            <Button
              onClick={() => {
                navigate("/smstexts");
              }}
              variant="contained"
              sx={{backgroundColor:"#d6a977"}}
            >
              Send Texts
            </Button>
            {/* navigates to page where you can add new participants manually */}
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
    
    {/* TABLE */}
      <div className="container1">
        <table class="pt_list">
          <thead>
          {/* table headers */}
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
            {/* table rows: if using search bar, table data pulled from tableFilter variable.
                            else, table data is pulled from general participantList */}
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
              })} 
              </tbody>
            </table>
        </div>
  </div>
  );
}
    
