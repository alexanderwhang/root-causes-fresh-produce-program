import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
// import RadioButtonsAvailability from './radioAvailability.js';
import FinalNote from '../uploadImages/notes/finalNote.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
// import { rows } from '../calls/rows.js';
import axios from 'axios';
// import rows from '../calls/rows.json';
import { useEffect, useState } from "react";
import '../../styleSheets/callsTable.css';
import '../../styleSheets/tableRoute.css';

const baseUrl = "http://127.0.0.1:5000"

// react table theme
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00743e",
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  
// handles submittion of participant availability for food delivery
  const handleSubmit = e => {
    e.preventDefault();
    setStatus(e.target.value);
    console.log(status);
  }

// handles submittion of participant notes in participant drop down field
  const handleSubmit2 = e => {
    e.preventDefault();
    setNotes(e.target.value);
    console.log(notes);
    
  }

  // displays date and time of participant availability submission
  const time = null;
  const current = null;
  const date = null;
  const final = null;
  const [status_time, setDate] = useState(""); 
  const handleTime = () => {
    let current = new Date();
    let date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    let time = current.toLocaleTimeString();
    setDate(time + " on " + date);
  }

  // changes color of participant availability submit button when mouse hovers over button
  function changeBackground1(e) {
    e.target.style.background = "#72bc44";
  }

  function changeBackground2(e) {
    e.target.style.background = "#00743e";
  }

  {/* STATUS KEY: 1 = ready for delivery | 2 = Not this week | 3 = Requires follow-up call | 4 =  No status set | 5 = No response*/}
  function numToString(int) {
    if (int == 1) {
      return "Ready for delivery"
    } else if (int == 2) {
      return "Not this week"
    } else if (int == 3) {
      return "Requires follow-up call"
    } else if (int == 4) {
      return "No status set"
    } else {
      return "No response"
    }
  }

  // entire "Calls" page table displaying list of assigned participants and option to set and submit their availability status for food delivery
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* displays participant's name (first and last name), preferred language, and "Most Recent Call" displaying the date and time of the most recent availability status submission */}
        <TableCell 
            component="th"
            scope="row"
            style={{fontSize: "17px"}}>
          <span style={{fontWeight: "bold", fontSize: "20px"}}> 
            {row.first_name + " " + row.last_name} 
          </span> <br /> 
          <a href={"tel:" + row.phone}>{row.phone}</a>
          <br /> Preferred Language: {row.language}
          <br /> Most Recent Call: {row.most_recent_call}

          
        </TableCell>        
        <TableCell>  
          <form noValidate method = "post" action="http://127.0.0.1:5000/status_from_calls">
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="status_time" value={status_time} />
            <FormControl>
            <FormLabel id="radio-buttons-availability">Please mark participant availability for food delivery this weekend: </FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-availability"
              name="radio-buttons-group"
              defaultValue = "No Response"
              >
              <FormControlLabel name = 'status' control={<Radio />} value={1} label="Available" />
              <FormControlLabel name = 'status' control={<Radio />} value={3} label="No Response" />
              <FormControlLabel name = 'status' control={<Radio />} value={2} label="Not Available" />
            </RadioGroup>
            {/* STATUS KEY: 1 = ready for delivery | 2 = Not this week | 3 = Requires follow-up call | 4 =  No status set | 5 = No response*/}

        {/* participant availability for delivery submission button */}  
        <Button className="submitCall"
            style={{backgroundColor: "#00743e"}}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
            onClick={handleTime}
            onMouseOver={changeBackground1}
            onMouseOut={changeBackground2}
            >
            Submit
        </Button>
        </FormControl>
        </form>
        </TableCell>
      </TableRow>

      {/* handles submission of notes field in participant drop down*/}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Participant Notes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                    <div id="btn-group">
                      <form noValidate method = "post" action="http://127.0.0.1:5000/calls/notes">
                        <input type="hidden" name="id" value={row.id} />
                        <input style={{ marginRight: '15px' }} type= "text" name="notes" placeholder="Enter notes here..." />
                      <br />
                      <Button id="note_submit"
                          style={{marginTop: "10px", marginRight: "5px"}}
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onSubmit={handleSubmit2}
                          >
                          Submit
                      </Button>

                      {/* button to delete entire notes history presently accessible by all volunteers; in future, make only accesible by admin to avoid deleting important information */}
                      {/* <form noValidate method = "post" action="http://127.0.0.1:5000/calls/deletenotes">
                        <input type="hidden" name="id" value={row.id} />
                        <Button id="note_delete"
                            name = "delete"
                            style={{marginTop: "10px"}}
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onSubmit={handleSubmit2}
                            >
                            DELETE NOTE HISTORY
                        </Button>                        
                      </form> */}
                    </form>
                    </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* displays note history of participant in drop down field*/}
                <TableHead>
                      <TableRow>
                        <TableCell> <b> Note History </b> </TableCell>
                      </TableRow>
                    </TableHead>
                        <TableBody>
                          <TableRow key="extra2">
                            <TableCell component="th" scope="row">
                              {row.call_notes}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                <TableBody>
                    <TableRow key={row.id}>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    address: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

// drop down field for individual participants
export default function CollapsibleTable() {
    const [rows, setRows] = useState([]);

    // GET PARTICIPANTS
    // 1 = GREEN, ready for delivery
    // 3 = SALMON, needs follow-up call
    const fetchRows = async () => {
      const data = await axios.get(`${baseUrl}/routesparticipants/status/3`);
      const { participants } = data.data;
      setRows(participants);
    };
  
    useEffect(() => {
      fetchRows();
    }, []);

// table labels
  return (
    <TableContainer 
        component={Paper}
        style={{paddingBottom: '100px'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Participant Information</StyledTableCell>
            <StyledTableCell>Participant Availability</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

  