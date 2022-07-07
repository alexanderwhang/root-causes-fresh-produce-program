import './App.css';  
import {Users} from './users';
import {Link} from "react-router-dom";     
import axios from "axios";
// import {useState} from 'react'; 
import React from 'react'; 
import {Table} from './Table';
import {Pt_data} from './pt_data'; 
import {Vol_data} from './vol_data'
import Navbar from "./components/Navbar/Navbar";
import {useEffect, useState} from 'react';

const baseUrl = "http://127.0.0.1:5000"

export function Participants(){  

  const [participantsList, setParticipantsList] = useState([]);

  // GET
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants`)
    const { participants } = data.data
    setParticipantsList(participants);
    console.log("DATA: ", data)
  }

  useEffect(() => {
    fetchParticipants();
  }, [])

    const [query,setQuery] = useState(""); 
    const keys =["status","firstName","lastName","address","phoneNumber","email","language"]  
    const search=(data)=>{  
      return data.filter((item)=>keys.some(key=>item[key].toLowerCase().includes(query)));
    };
  
    return( 
      <div> 
        {/* nav bar */}
      <Navbar/> 
        <section>  
          <input type="text" placeholder ="Search..." className ="search" onChange ={(e)=>setQuery(e.target.value)}/>
          </section>
  
        <section id="contact_list"> 
          <h3> Participants </h3>
          {/* participant table */}
          <Table data ={search(participantsList)}/>
        </section> 
      </div>
      
    );
  };  