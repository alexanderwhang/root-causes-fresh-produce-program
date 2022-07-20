import "./VolInfo.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar/Navbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FooterContainer } from "../containers/footer";

const baseUrl = "http://127.0.0.1:5000";

export function VolInfoPage() {
  const [volunteersList, setVolunteersList] = useState([]);
  const [driversList, setDriversList] = useState([]);
  const [packersList, setPackersList] = useState([]);
  const [callersList, setCallersList] = useState([]);

  //search
    const [value, setValue] = useState("");
    const [tableFilter, setTableFilter] = useState([]);

    const filterData = (event) => {
      if(event.target.value !== ""){
        setValue(event.target.value);
        const filterTable = volunteersList.filter(o=>Object.keys(o).some(k=>
            String(o[k]).toLowerCase().includes(event.target.value.toLowerCase())));
            setTableFilter([...filterTable])
            event.stopPropagation();
        event.preventDefault();
      } else{
        event.stopPropagation();
        event.preventDefault();
        setValue(event.target.value);
        setVolunteersList([...volunteersList]);
      }
    }
  


  //backend calls

    // GET ALL VOLUNTEERS
    const fetchVolunteers = async () => {
      const data = await axios.get(`${baseUrl}/volunteers`);
      const { volunteers } = data.data;
      setVolunteersList(volunteers);
      console.log("DATA2: ", data);
    };

    // GET PACKERS
    const fetchPackers = async () => {
      const data = await axios.get(`${baseUrl}/volunteers/type/Packer`);
      const packers = data.data.volunteers;
      console.log("DATA1: ", data);
      console.log("DRIVERS: ");
      console.log(packers);
      setPackersList(packers);
    };

    // GET DRIVERS
    const fetchDrivers = async () => {
      const data = await axios.get(`${baseUrl}/volunteers/type/Driver`);
      const drivers = data.data.volunteers;
      console.log("DATA1: ", data);
      console.log("DRIVERS: ");
      console.log(drivers);
      setDriversList(drivers);
    };

    // GET CALLERS
    const fetchCallers = async () => {
      const data = await axios.get(`${baseUrl}/volunteers/type/Caller`);
      const callers = data.data.volunteers;
      console.log("DATA1: ", data);
      console.log("DRIVERS: ");
      console.log(callers);
      setCallersList(callers);
    };

    useEffect(() => {
      fetchVolunteers();
      fetchDrivers();
      fetchPackers();
      fetchCallers();
    }, []);

    // const Root = styled("div")(({ theme }) => ({
    //   width: "100%",
    //   ...theme.typography.body2,
    //   "& > :not(style) + :not(style)": {
    //     marginTop: theme.spacing(2),
    //   },
    // }));


  //tabs
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
      const [val, setVal] = useState(0);

      const handleChange = (event, newValue: number) => {
        setVal(newValue);
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
          value={val}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Current Week Volunteers" {...a11yProps(0)} />
          <Tab label="All Volunteers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={val} index={0}>
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
                  <th>First Time?</th>
                  <th>Credit?</th>
                  <th>Availability </th>
                </tr>
                  {callersList.map((caller) => {
                    return <tr key={caller.id}>
                            <td>{caller.first_name} {caller.last_name}</td>
                            <td>{caller.phone}</td>
                            <td>{caller.email}</td>
                            <td>{caller.language}</td>
                            <td> {boolMap.get(caller.first_time)}</td>
                            <td>{boolMap.get(caller.hipaa)}</td>
                            <td>{boolMap.get(caller.credit)}</td>
                            <td>...</td>
                        </tr>;
                  })}
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
                  <th>First Time?</th>
                  <th>Credit?</th>
                  <th>Availability </th>
                </tr>
                  {driversList.map((driver) => {
                    return <tr key={driver.id}>
                            <td>{driver.first_name} {driver.last_name}</td>
                            <td>{driver.phone}</td>
                            <td>{driver.email}</td>
                            <td>{driver.language}</td>
                            <td> {boolMap.get(driver.first_time)}</td>
                            <td>{boolMap.get(driver.hipaa)}</td>
                            <td>{boolMap.get(driver.credit)}</td>
                            <td>...</td>
                        </tr>;
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
                  <th>First Time?</th>
                  <th>Credit?</th>
                  <th>Availability </th>
                </tr>
                {packersList.map((packer) => {
                    return <tr key={packer.id}>
                            <td>{packer.first_name} {packer.last_name}</td>
                            <td>{packer.phone}</td>
                            <td>{packer.email}</td>
                            <td>{packer.language}</td>
                            <td> {boolMap.get(packer.first_time)}</td>
                            <td>{boolMap.get(packer.hipaa)}</td>
                            <td>{boolMap.get(packer.credit)}</td>
                            <td>...</td>
                        </tr>;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={val} index={1}>
        <div className="all_vols">
          <div id="search">
            <TextField
            id="searchField"
            label="Search"
            defaultValue={value}
            onChange={filterData}
            type="search"
          />
          </div>
          <table class="vol_list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Language</th>
                {/* <th>Type</th> */}
                <th>HIPAA?</th>
                <th>Affiliation</th>
                <th>For Credit?</th>
                {/* Last date of activity?? */}
                </tr>
              </thead>
              <tbody>
              {(value.length > 0) ? tableFilter.map((volunteer) => {
                return (
                  <tr key={volunteer.id}>
                    <td>
                      {" "}
                      {volunteer.first_name} {volunteer.last_name}{" "}
                    </td>
                    <td>{volunteer.phone}</td>
                    <td>{volunteer.email}</td>
                    <td>{volunteer.language}</td>
                    {/* <td></td> */}
                    <td> {boolMap.get(volunteer.first_time)}</td>
                    <td>{boolMap.get(volunteer.hipaa)}</td>
                    <td>{boolMap.get(volunteer.credit)}</td>
                  </tr>
                )
                })
                :
                 volunteersList.map((volunteer) => {
                    return (
                      <tr key={volunteer.id}>
                    <td>
                      {" "}
                      {volunteer.first_name} {volunteer.last_name}{" "}
                    </td>
                    <td>{volunteer.phone}</td>
                    <td>{volunteer.email}</td>
                    <td>{volunteer.language}</td>
                    {/* <td></td> */}
                    <td> {boolMap.get(volunteer.first_time)}</td>
                    <td>{boolMap.get(volunteer.hipaa)}</td>
                    <td>{boolMap.get(volunteer.credit)}</td>
                  </tr>
              )
        })
} 
        </tbody>
          </table>
        </div>
      </TabPanel>
      <FooterContainer />
    </div>
  );
}
