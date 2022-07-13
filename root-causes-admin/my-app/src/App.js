import "./App.css";
import Participant from "./components/participant";
import Volunteer from "./components/volunteer";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import React from "react";
import axios from "axios";
import { Table } from "./Table";
// import { Vol_data } from "./vol_data";
import Navbar from "./components/Navbar/Navbar";
import { Driver } from "./pages/Driver.js";
import { VolInfoPage } from "./pages/VolInfo.js";
import { Texts } from "./pages/Texts.js";
import { Home } from "./home";
import TextField from "@mui/material/TextField";
// import {
//   accordionSummaryclassNamees,
//   imageListclassNamees,
// } from "@mui/material";
// import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// import NativeSelect from "@mui/material/NativeSelect";
// import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";
// import Divider from "@mui/material/Divider";
// import Chip from "@mui/material/Chip";
import { FooterContainer } from "./containers/footer";
// import Ellipse from "./symbols/Ellipse.svg";
import SvgEllipse from "./symbolComponents/Ellipse";
import { DragPractice } from "./practice.js";
import { PracticeUsers } from "./practiceUsers";
import { useEffect, useState } from "react";
// import ListSubheader from "@mui/material/ListSubheader";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"; 
import { Users } from "./users";

const baseUrl = "http://127.0.0.1:5000";
// const baseUrl = "localhost:5000"

//commands to run for it to work: 
//npm i react-scripts
// npm install axios --save
//npm install @mui/material @emotion/react @emotion/styled
//npm install --save styled-components
//npm i react-csv

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

  const [query, setQuery] = useState("");
  // const keys = [
  //   "status",
  //   "first_name",
  //   "last_name",
  //   "address",
  //   "phone_number",
  //   "email",
  //   "language",
  //   "group",
  // ];

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
  //   );
  // };

  return (
    <div>
      <Navbar />

      <section id="contact_list">
        <h2> Participants </h2>
        <div id="search">
          <TextField
            id="searchField"
            label="Search"
            // helperText="Some important text"
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            // style="background-color: white;"
          />
        </div>
        

        {/* <input type="text" placeholder ="Search..." className ="search" onChange ={(e)=>setQuery(e.target.value)}/> */}

        <Button 
          onClick={() => {
            navigate("/smstexts");
          }}
          variant="outlined"
        >
          Send Texts
        </Button>
        <section>
          {/* participant table */}
          <div className="container1">
            <Table data={participantsList} />
          </div>
        </section>
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

export function Callers() {
  let users =Users();
  let participantsList= users[users.length-1].items;
  let [peoples, setPeople] = useState(users);  

  return (
    <div>
      <DragPractice data={peoples} />
      {/* buttons */}
      <section id="call_assign">
        <div className="call_buttons">
          <Button variant="contained" >
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
  // const Root = styled("div")(({ theme }) => ({
  //   width: "100%",
  //   ...theme.typography.body2,
  //   "& > :not(style) + :not(style)": {
  //     marginTop: theme.spacing(2),
  //   },
  // }));

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      {participantsList.map((participant) => {
        return (
          <div key={participant.id}>
            <div className="indiv">
              {/* <Navbar/> */}
              <div className="indivButtonCont">
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/participants");
                  }}
                >
                  Back
                </Button>
              </div>
              <div className="indiv">
                {/* <h1> Individuals </h1> */}
                <h2>
                  {participant.first_name} {participant.last_name}
                </h2>

                {/* tabs code */}
                <Box
                  sx={{
                    borderBottom: 0,
                    borderColor: "#f7c86d",
                    color: "black",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                  >
                    <Tab label="General Info" {...a11yProps(0)} />
                    <Tab label="Medical Info" {...a11yProps(1)} />
                    <Tab label="Other Info" {...a11yProps(2)} />
                    <Tab label="Delivery History" {...a11yProps(3)} />
                    <Tab label="Call History" {...a11yProps(4)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Participant participant={participant} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <table className="med_info">
                    <tr>
                      <th>Unique Identifier</th>
                      <th>Provider Notes</th>
                      <th>Adding Provider</th>
                      <th>Referring Clinic Location</th>
                      <th>Date Referred by Provider</th>
                      <th>Med Equipment</th>
                    </tr>
                    <tr>
                      <td>#12345</td>
                      <td>Pulmonary Hypertension Diagnosis</td>
                      <td>Dr. Jones</td>
                      <td>Duke Hospital</td>
                      <td>8/23/21</td>
                      <td>KN95 Masks</td>
                    </tr>
                  </table>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <table className="other_info">
                    <tr>
                      <th>EAM Interest?</th>
                      <th>Call or Text Reminders?</th>
                      <th>Household Essentials Bag Requested?</th>
                      <th>Total HE Bags Received</th>
                      <th>Masks Requested?</th>
                      <th>Total Masks Received</th>
                    </tr>
                    <tr>
                      <td>Yes</td>
                      <td>Call</td>
                      <td>Yes</td>
                      <td>2</td>
                      <td>Yes</td>
                      <td>10</td>
                    </tr>
                  </table>
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <table className="del_history">
                    <tr>
                      <th>Date</th>
                      <th>Participant Interaction Notes</th>
                      <th>Delivery Notes</th>
                    </tr>
                    <tr>
                      <td>06/18/2022</td>
                      <td>Participant is doing well</td>
                      <td>Yellow house, red windows</td>
                    </tr>
                    <tr>
                      <td>06/4/2022</td>
                      <td>N/A</td>
                      <td>Parking around the corner</td>
                    </tr>
                  </table>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <table className="call_history">
                    <tr>
                      <th>Date</th>
                      <th>Participant Interaction Notes</th>
                    </tr>
                    <tr>
                      <td>06/18/2022</td>
                      <td>Participant is doing well, ready for delivery</td>
                    </tr>
                    <tr>
                      <td>06/4/2022</td>
                      <td>Participant does not want delivery this week.</td>
                    </tr>
                  </table>
                </TabPanel>
              </div>
              
            </div>
            <div className="tempBorder"></div>
          </div>
        );
      })}
    </div>
  );
}

export function SMSTexts() {
  return <Texts />;
}

export function VolInfo() {
  return <VolInfoPage />
}

export function Drivers() {
  return <Driver />;
}

// export function Footer() {}
// export function Analytics() {
//   return (
//     <div>
//       <Navbar />
//       <h1 className="constructing">Under construction</h1>
//       <iframe
//         src="https://giphy.com/embed/ZofCGn3c0VK9y"
//         width="480"
//         height="348"
//         frameBorder="0"
//         className="giphy-embed"
//         allowFullScreen="true"
//       ></iframe>
//       <p>
//         <a href="https://giphy.com/gifs/pokemon-pikachu-ZofCGn3c0VK9y"></a>
//       </p>
//       <FooterContainer />
//     </div>
//   );
// }

export function App({ library }) {
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
      <Home />
      <div className="welcome">
        <h2>{date}</h2>
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
