import "./App.css";
import NewParticipant from "./components/addPt.js";
import Volunteer from "./components/volunteer";
import {Indiv} from "./pages/Individual";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Table } from "./components/Table";
import Navbar from "./components/Navbar/Navbar";
import { Driver } from "./pages/Driver.js";
import { VolInfoPage } from "./pages/VolInfo.js";
import Texts from "./pages/Texts.js";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { FooterContainer } from "./containers/footer";
import SvgEllipse from "./symbolComponents/Ellipse";
import { DragPractice } from "./practice.js"; 
import {PracticeUsers} from "./practiceUsers"
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReactPaginate from 'react-paginate';
import { Users } from './users.js';
import { CallAssignments } from "./callerManagement";


//COMMANDS TO EXECUTE IN TERMINAL IN ORDER FOR APP TO WORK PROPERLY:
    //npm install axios --save
    //npm install @mui/material @emotion/react @emotion/styled
    //npm install --save styled-components
    //npm i react-csv
    //npm install xlsx
    //npm install react-paginate --save



// CONNECTS TO THE DATABASE/BACKEND
const baseUrl = "http://127.0.0.1:5000";

// PARTICIPANTS PAGE:
export function Participants() {

  // the following code allows us to access the full list of participants in database, through axios calls to the backend
    const [participantsList, setParticipantsList] = useState([]);

    // GET
    const fetchParticipants = async () => {
      const data = await axios.get(`${baseUrl}/participants`);
      const { participants } = data.data;
      setParticipantsList(participants);
      console.log("DATA: ", data);
    };

    useEffect(() => {
      fetchParticipants();
    }, []);

  return (
    <div>
      <Navbar />

      {/* top of participant page */}
      <section id="contact_list">
        <h2> Participants </h2>
        
        {/* the following div with the Table component includes the search bar, the participant Table
          and the buttons on the participant page */}
        <div className="contact-list-container">
            <Table/>
        </div>

        {/* the following div displays a color key for participant statuses */}
        {/* to add a new color in the key:
                1. copy and paste a "colorInKey div" 
                2. change the color to the name of the preferred color
                3. change text to reflect new color meaning */}
        <div className="colorKey">
          <h4> Key: </h4>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "grey" }} /> 
            <p> No Status Set </p>
          </div>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "green" }} />{" "}
            <p> Ready for Delivery </p>
          </div>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "tan" }} /> 
            <p>Not This Week</p>
          </div>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "salmon" }} />{" "}
            <p>Requires Follow Up Call</p>
          </div>
        </div>
      </section>

      {/* footer */}
      <div className="footer">
        <FooterContainer />
      </div>
    </div>
  );
}

// ADD PARTICIPANT: ACCESSIBLE FROM PARTICIPANTS PAGE: "ADD PARTICIPANT" BUTTON
export function AddParticipant() {
  // code found in components folder under "addPt.js"
   return <NewParticipant/>;
}

// CALLER MANAGEMENT PAGE (FOUND IN NAVBAR'S VOLUNTEER MANAGEMENT)
export function Callers() {
  return (
    <CallAssignments />
  );
}

// INDIVIDUAL INFO PAGE. ACCESSIBLE BY CLICKING ON A PARTICIPANT'S NAME IN THE PARTICIPANTS PAGE
export function Individual() {
  // code found in pages folder under "Individual.js"
  return <Indiv/>
}

//SMS PAGE ACCESSIBLE FROM PARTICIPANTS PAGE: "SEND TEXTS" BUTTON
export function SMSTexts() {
  // code found in the pages folder under Texts.js
  return <Texts />;
}

// VOLUNTEER INFO PAGE:
export function VolInfo() {
  // found in pages folder under VolInfo.js
  return <VolInfoPage />;
}

// DRIVER MANAGEMENT PAGE (FOUND IN NAVBAR'S VOLUNTEER MANAGEMENT)  
export function Drivers() {
  // found in the pages folder under Driver.js
  return <Driver />;
}

// HOME PAGE:
export function App({ library }) {

  // .getDay() and .getMonth() return numbers. the following maps translate those 
  // numbers into the appropriate days and months for easy display
  let dayMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);
  let monthMap = new Map([
    [0, "January"],
    [1, "February"],
    [2, "March"],
    [3, "April"],
    [4, "May"],
    [5, "June"],
    [6, "July"],
    [7, "August"],
    [8, "September"],
    [9, "October"],
    [10, "November"],
    [11, "December"],
  ]);
  const current = new Date();
  const date = `${dayMap.get(current.getDay())} ${monthMap.get(
    current.getMonth()
  )} ${current.getDate()}, ${current.getFullYear()}`;

  return (
    <div>
      <Navbar/>
      <div className="welcome">
        <h2>{date}</h2>
        {/* the following link is the image displayed on home page */}
        <img
          src="https://static.wixstatic.com/media/508ee3_ff1e79887699439ba7be28422d68d318~mv2.jpg/v1/crop/x_136,y_0,w_5743,h_4016/fill/w_798,h_558,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/_DSC8483%20(2).jpg"
          alt="welcome"
        />
        <div className="centered">
          <h1 id="picText"> Welcome Admin! </h1>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
}

export default App;
