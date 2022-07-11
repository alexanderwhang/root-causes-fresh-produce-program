import "./App.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import React from "react";
import axios from "axios";
import { Table } from "./Table";
// import { Vol_data } from "./vol_data";
import Navbar from "./components/Navbar/Navbar";
import { Driver } from "./pages/Driver.js";
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

//HELLO WORLD
const test = ":/";
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
  console.log(peoples) 
  const CreateAssignment = () => {
    let DistributedUsers = [];
    //Splits the participants into chunks for volunteers
    function splitParticipants(data, chunkSize) {
      let ret = [];
      for (let i = 0; i < data.length; i += chunkSize) { 
        if(data==undefined){ 
          ret.push([])
        } 
        else{
        const chunk = data.slice(i, i + chunkSize); 
        ret.push(chunk); 
        }
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
          if (key === volunteer.language) {
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
        Math.ceil(participants.length /volunteers.length)
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
        title: "pts",
        items: [],
        language: null

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
      for(let i =0;i<ret.length;i++){ 
          let volunteer=ret[i]; 
          if(volunteer.items===null){  
            volunteer.items =[]; 
          }
      }
      ret.push(Participants);
      for (let k = 0; k < ret.length; k++) {
        let person = ret[k];
        person.index = k + 1;
      }

      return ret;
    }

    let participants = participantToLanguages(participantsList);
    let volunteers = volunteersToLanguages(users);

    DistributedUsers = matchVolstoParts(participants, volunteers);  
   
    setPeople(DistributedUsers);  
    peoples = DistributedUsers; 
    console.log(peoples)
  }; 
  console.log(peoples);
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

  const editInfo = () => {};

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

  let statusMap = new Map([
    [0, "grey"],
    [4, "grey"],
    [1, "green"],
    [2, "tan"],
    [3, "salmon"],
  ]);

  const [status, setStatus] = React.useState(0);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  // function handleSubmitStatus(event) {
  //   event.preventDefault();
  //   const url = "http://localhost:3000/uploadFile";
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("fileName", file.name);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   axios.post(url, formData, config).then((response) => {
  //     console.log(response.data);
  //   });
  // }

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    console.log(`Participant id: ${e.target.id}`);
    try {
      const data = await axios.put(`${baseUrl}/participants/1`, { status });
      setParticipantsList([...participantsList, data.data]);
      handleStatusChange("");
      console.log("Receive submit");
    } catch (err) {
      console.error(err.message);
      console.log(`Participant id: ${e.target.id}`);
    }
  };

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
                <div className="editButton">
                  <Button variant="outlined" size="small" onClick={editInfo}>
                    Edit
                  </Button>
                </div>

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
                            color: `${statusMap.get(participant.status)}`,
                          }}
                        >
                          <SvgEllipse />
                        </div>
                      </td>
                      <td>{participant.address}</td>
                      <td>{participant.email}</td>
                      <td>{participant.phone}</td>
                      <td>{participant.language}</td>
                    </tr>
                    <tr>
                      <th>Group</th>
                      <th>Household Size</th>
                      <th>Pronouns</th>
                      <th>Age</th>
                      <th>Race/Ethnicity</th>
                    </tr>
                    <tr>
                      <td>{participant.group}</td>
                      <td>5</td>
                      <td>she/her/hers</td>
                      <td>56</td>
                      <td>Caucasian</td>
                    </tr>
                  </table>
                  <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                      <form onSubmit={handleSubmitStatus} id={participant.id}>
                        <input type="hidden" name="id" value={participant.id} />
                        <InputLabel id="select-status-label">Status</InputLabel>
                        <Select
                          defaultValue={{
                            label: "test",
                            value: participant.status,
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
                        <Button type="submit" value={participant.id}>
                          Submit
                        </Button>
                      </form>
                    </FormControl>
                  </Box>
                  {/* ); */}
                  {/* <table className="personal_info">
          <tr>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Language</th>
          </tr>
          <tr>
            <td>71 Lyons Junction</td>
            <td>584-350-9281</td>
            <td>gpatman0@globo.com</td>
            <td>Tsonga</td>
          </tr>
          </table> */}
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
  const [volunteersList, setVolunteerList] = useState([]);
  const [driversList, setDriversList] = useState([]);

  // GET ALL VOLUNTEERS
  const fetchVolunteers = async () => {
    const data = await axios.get(`${baseUrl}/volunteers`);
    const { volunteers } = data.data;
    setVolunteerList(volunteers);
    console.log("DATA: ", data);
  };

  // GET DRIVERS
  const fetchDrivers = async () => {
    const data = await axios.get(`${baseUrl}/volunteers/drivers`);
    const { drivers } = data.data;
    setDriversList(drivers);
    console.log("DATA: ", data);
  };

  useEffect(() => {
    fetchVolunteers();
    fetchDrivers();
  }, []);

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
  const [query, setQuery] = React.useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const keys = [
  //   "firstName",
  //   "lastName",
  //   "phoneNumber",
  //   "email",
  //   "language",
  //   "type",
  //   // "hippa",
  //   // "credit"
  // ];

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) =>
  //       item[key].toLowerCase().includes(value.query.toLowerCase())
  //     )
  //   );
  // };

  let boolMap = new Map([
    [true, "Y"],
    [false, "N"],
  ]);

  return (
    <div>
      <Navbar />
      <h2> Volunteer Info </h2>
      <Box sx={{ borderBottom: 0, borderColor: "#f7c86d", color: "black" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Current Week Volunteers" {...a11yProps(0)} />
          <Tab label="All Volunteers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="curr_vols">
          <h3> Callers </h3>
          {/* date of availability? */}
          <div className="vol_type">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Language</th>
                  <th>HIPAA?</th>
                  <th>First Time? </th>
                  <th>Availability </th>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3> Drivers </h3>

          <div className="vol_type">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Language</th>
                  <th>HIPAA?</th>
                  <th>First Time? </th>
                  <th>Availability </th>
                </tr>
                {driversList.map((driver) => {
                return (
                  <tr key={driver.id}>
                    <td>
                      {" "}
                      {driver.first_name} {driver.last_name}{" "}
                    </td>
                    <td>{driver.phone}</td>
                    <td>{driver.email}</td>
                    <td>{driver.language}</td>
                    <td> {boolMap.get(driver.first_time)}</td>
                    <td>{boolMap.get(driver.hipaa)}</td>
                    <td>{boolMap.get(driver.credit)}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
          <h3> Packers </h3>
          <div className="vol_type">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Language</th>
                  <th>HIPAA?</th>
                  <th>First Time? </th>
                  <th>Availability </th>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="all_vols">
          <div id="search">
            <TextField
              id="searchField"
              label="Search"
              onChange={(e) => setQuery(e.target.value)}
              type="search"
            />
          </div>
          <table class="vol_list">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Language</th>
                <th>Type</th>
                <th>HIPPA?</th>
                <th>Affiliation</th>
                <th>For Credit?</th>
                {/* Last date of activity?? */}
              </tr>
              {volunteersList.map((volunteer) => {
                return (
                  <tr key={volunteer.id}>
                    <td>
                      {" "}
                      {volunteer.first_name} {volunteer.last_name}{" "}
                    </td>
                    <td>{volunteer.phone}</td>
                    <td>{volunteer.email}</td>
                    <td>{volunteer.language}</td>
                    <td></td>
                    <td> {boolMap.get(volunteer.first_time)}</td>
                    <td>{boolMap.get(volunteer.hipaa)}</td>
                    <td>{boolMap.get(volunteer.credit)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabPanel>
      <FooterContainer />
    </div>
  );
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
