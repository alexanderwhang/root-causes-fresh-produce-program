import "./App.css";
import Participant from "./components/participant";
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

const baseUrl = "http://127.0.0.1:5000";
// const baseUrl = "localhost:5000"

//commands to run for it to work:
//npm install axios --save
//npm install @mui/material @emotion/react @emotion/styled
//npm install --save styled-components
//npm i react-csv
//npm install xlsx
//npm install react-paginate --save

export function Participants() {
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

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar />

      <section id="contact_list">
        <h2> Participants </h2>
        
        <div className="contact-list-container">

            <Table/>
        </div>
        <div className="colorKey">
          <h4> Key: </h4>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "grey" }} /> <p> No Status Set </p>
          </div>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "green" }} />{" "}
            <p> Ready for Delivery </p>
          </div>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "tan" }} /> <p>Not This Week</p>
          </div>
          <div className="colorInKey">
            <SvgEllipse style={{ color: "salmon" }} />{" "}
            <p>Requires Follow Up Call</p>
          </div>
        </div>
      </section>

      <div className="footer">
        <FooterContainer />
      </div>
    </div>
  );
}

export function AddParticipant() {
   return <NewParticipant/>;
}

export function Callers() {
  const [participantsList, setParticipantsList] = useState([]);
  const [volunteersList, setVolunteersList] = useState([]);

  // GET PARTICIPANTS
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants/status/3`);
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data);
  };

  useEffect(() => {
    fetchParticipants();
    fetchVolunteers();
  }, []);

  // GET VOLUNTEERS
  const fetchVolunteers = async () => {
    const data = await axios.get(`${baseUrl}/volunteers`);
    const { volunteers } = data.data;
    setVolunteersList(volunteers);
    console.log("DATA: ", data);
  };

  let users = [];
  volunteersList.map((vol) => {
    return users.push({ title: vol.id, items: [] });
  });

  users.push({ title: "pts", items: participantsList });
  console.log(users);

  const [peoples, setPeople] = useState(PracticeUsers);
  const CreateAssignment = () => {
    const participantsList = PracticeUsers[PracticeUsers.length - 1].items;
    // let Lans = [];

    let DistributedUsers = [];

    //Splits the participants into chunks for volunteers
    function splitParticipants(data, chunkSize) {
      let ret = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        ret.push(chunk);
      }  
      while(ret.length<PracticeUsers.length-1){ 
        ret.push([]);
      }
      return ret;
    }

    //gets and stores the languages of the volunteers
    function volunteersToLanguages(data) {
      var languagesSpoken = new Map();
      const participants = data[data.length - 1].items;

      //set the map
      for (let i = 0; i < participants.length; i++) {
        let participant = participants[i];
        languagesSpoken.set(participant.language, []);
      }
      for (let j = 0; j < data.length - 1; j++) {
        let volunteer = data[j];

        for (const [key, value] of languagesSpoken.entries()) {
          if (key === volunteer.primaryLan) {
            value.push(volunteer);
          }
        }
      }
      return languagesSpoken;
      //return languagesSpoken;
    }

    //gets and stores the languages of the volunteers
    function participantToLanguages(data) {
      var languagesSpoken = new Map();
      for (let i = 0; i < data.length; i++) {
        let participant = data[i];
        if (languagesSpoken.has(participant.language)) {
          languagesSpoken.get(participant.language).push(data[i]);
        } else {
          languagesSpoken.set(participant.language, []);
          languagesSpoken.get(participant.language).push(participant);
        }
      }
      return languagesSpoken;
    }

    //assigns the participants to the volunteers
    //the function assumes that the part.lan ===vol.lang
    function partToVol(volunteers, participants) {
      //ret
      let ret = [];
      //break up the participants into chunks
      const participantChunks = splitParticipants(
        participants,
        Math.ceil(participants.length / volunteers.length)
      );
      //iterate through each volunteer based on language
      //set each volunteer to a chunks
      for (let i = 0; i < volunteers.length; i++) {
        let volunteer = volunteers[i];
        volunteer.items = participantChunks[i];
        ret.push(volunteer);
      }
      return ret;
    }
    //if no volunteer speaks the languages put in participants
    //if the algorithm will catch the 1 case
    /*if multiple volunteers speak the same language as participants then distribute amongst the volunteers
    then throw them in to the final array*/
    function matchVolstoParts(part, vol) {
      //creat the participants list object
      let ret = [];
      let Participants = {
        index: null,
        title: "Participants",
        items: [],
        primaryLan: null,
        secondaryLan: null,
      };
      let languages = vol.keys();
      for (const key of languages) {
        if (volunteers.get(key).length === 0) {
          let temp = participants.get(key);
          for (let j = 0; j < temp.length; j++) {
            let participant = temp[j];
            Participants.items.push(participant);
          }
        } else {
          //returns all the volunteers
          let temp = partToVol(volunteers.get(key), participants.get(key));

          for (let i = 0; i < temp.length; i++) {
            ret.push(temp[i]);
          }
        }
      }
      Participants.index = ret.length + 1;
      ret.push(Participants);
      for (let k = 0; k < ret.length; k++) {
        let person = ret[k];
        person.index = k + 1;
      }

      return ret;
    }

    let participants = participantToLanguages(participantsList);
    let volunteers = volunteersToLanguages(PracticeUsers);

    DistributedUsers = matchVolstoParts(participants, volunteers);
    setPeople(DistributedUsers);
   // PracticeUsers = matchVolstoParts(participants, volunteers);
  };
  return (
    <div>
      <DragPractice data={peoples} />
      {/* buttons */}
      <section id="call_assign">
        <div className="call_buttons">
          <Button variant="contained" onClick={CreateAssignment}>
            Generate Assignments
          </Button>
          <Button color="success" variant="contained">
            Confirm Assignments{" "}
          </Button>
        </div>
      </section>
      <FooterContainer />
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function Individual({ match }) {
  return <Indiv/>
}

export function SMSTexts() {
  return <Texts />;
}

export function VolInfo() {
  return <VolInfoPage />;
}

export function Drivers() {
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
