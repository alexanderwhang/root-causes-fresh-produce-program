import axios from "axios"; 
import React, { useState,useEffect} from "react";

const baseUrl = "http://127.0.0.1:5000"; 
let ret =[]
export function tempParticipants(){
const [participantsList, setParticipantsList] = useState([]); 
const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants`);
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data);
  }; 
  useEffect(() => {
    fetchParticipants();
  }, []);  
  ret=[...participantsList]; 
  return ret;
}
