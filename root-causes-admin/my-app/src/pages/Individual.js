import "../App.css";
import React from "react";
import axios from "axios";
import Participant from "../components/participant";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FooterContainer } from "../containers/footer";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import ReactPaginate from 'react-paginate';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";


const baseUrl = "http://127.0.0.1:5000";

export function Indiv() {

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

  const [person, setPerson] = useState(participantsList);
  // console.log("pts: ", participantsList);
  // console.log("users: ", Users);
  const [pageNumber,setPageNumber]= useState(0);
  const usersPerPage = 1;
  const pagesVisited = pageNumber*usersPerPage;

  const displayUsers = participantsList.slice(pagesVisited,pagesVisited + usersPerPage).map((val,key)=>  {
    return (
      <div>
      <Navbar />
          <div key={key}>
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
                  {val.first_name} {val.last_name}
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
                  <Participant participant={val} />
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
                      <td>Type 2 Diabetes</td>
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
          </div>
        </div>
  )});

  const pageCount = Math.ceil(participantsList.length/usersPerPage);
  const changePage = ({selected})=>{
    setPageNumber(selected);
  }

   return(
    <div>
      {displayUsers}
      <ReactPaginate
       previousLabel ={"Previous"}
       nextLabel={"Next"}
       pageCount ={pageCount}
       onPageChange = {changePage}
       containerClassName={"paginationBttns"}
       previousLinkClassName={"previousBttn"}
       nextLinkClassName ={"nextBttn"}
       disabledClassName ={"paginationDisabled"}
       activeClassName= {"paginationActive"}
      />
      </div>
    );
}