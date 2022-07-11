import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar/Navbar"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FooterContainer } from "../containers/footer";



const baseUrl = "http://127.0.0.1:5000";

export function VolInfoPage() {
    const [volunteersList, setVolunteerList] = useState([]);
  
    // GET
    const fetchVolunteers = async () => {
      const data = await axios.get(`${baseUrl}/volunteers`);
      const { volunteers } = data.data;
      setVolunteerList(volunteers);
      console.log("DATA: ", data);
    };
  
    useEffect(() => {
      fetchVolunteers();
    }, []);
  
    const Root = styled("div")(({ theme }) => ({
      width: "100%",
      ...theme.typography.body2,
      "& > :not(style) + :not(style)": {
        marginTop: theme.spacing(2),
      },
    }));
  
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
  
    const keys = [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "language",
      "type",
      // "hippa",
      // "credit"
    ];
  
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) =>
          item[key].toLowerCase().includes(value.query.toLowerCase())
        )
      );
    };
  
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