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

  

  const handleSubmit = e => {
    e.preventDefault();
    setStatus(e.target.value);
    console.log(status);
  }


  const handleSubmit2 = e => {
    e.preventDefault();
    setNotes(e.target.value);
    console.log(notes);
    
  }

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

  // const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  // let time = current.toLocaleTimeString();

  // to select button based on selection
  // value = {row.status}

  function changeBackground1(e) {
    e.target.style.background = "#72bc44";
  }

  function changeBackground2(e) {
    e.target.style.background = "#00743e";
  }


  function printArray(obj) {
    const myArray = obj.toString().split(",")
    if (myArray.length === 0) {
      return;
    }
    const listItems = myArray.map((note) => 
                      <li style={{fontSize: "17px"}}>{note}</li>); 
    return <ul> {listItems} </ul> 
    }

  function mostRecent(obj) {
    const myArray = obj.toString().split(",")
    const last = myArray.length - 1
    return <h3 style={{display: "inline", color: "black", fontSize: "17px"}}>{myArray[last]} </h3>
  }

  function getdeleteIndex(obj) {
    const myArray = obj.toString().split(",");
    for (let i = 0; i < myArray.length; i++){
      if (obj == myArray[i]){
        return i;
      }
    }
  }

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
        <TableCell 
            component="th"
            scope="row"
            style={{fontSize: "17px"}}>
          <span style={{fontWeight: "bold", fontSize: "20px"}}> 
            {row.first_name + " " + row.last_name} 
          </span> <br /> 
          <a href={"tel:" + row.phone}>{row.phone}</a>
          <br /> Preferred Language: {row.language}
          {/* <br /> Most Recent Note: <b> {row.call_notes} </b> */}
            {/* {mostRecent(row.call_notes)}  */}
          <br /> Most Recent Call: {row.most_recent_call}

          
        </TableCell>        
        <TableCell>  
          <form noValidate method = "post" action="http://127.0.0.1:5000/status_from_calls">
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="status_time" value={status_time} />
            <FormControl>
            <FormLabel id="radio-buttons-availability">Please mark participant availability: </FormLabel>
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

          {/* <form 
          method = "post" action="http://127.0.0.1:5000/calls">
            <input type="hidden" name="id" value={row.id} />
            <p>Enter participant's availability</p>
            <div class="form-group">
              <input class="form-control" type="text" name="status" placeholder="status" />
            </div>
            <div class="form-group">
              <button 
                class="btn btn-primary"
                onSubmit={handleSubmit}>Submit</button>
            </div>
          </form> */}
        </TableCell>
      </TableRow>
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
                      <form noValidate method = "post" action="http://127.0.0.1:5000/calls/deletenotes">
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
                      </form>
                    </form>
                    </div>
                      <h5 style={{fontSize: "20px", fontWeight: "bold"}}>Note History</h5>
                      <p style={{fontSize: "17px", color: "black"}}> {row.call_notes} </p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.id}>
                      <TableCell></TableCell>
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

export default function CollapsibleTable() {
  // const [rows, setRows] = useState([])

  // axios!
  // const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   axios
  //   .get('http://127.0.0.1:5000/calls')
  //   .then((res) => {console.log(res)
  //      setRows(res.data)})
  //   .catch((err) => {console.log(err)
  //   })
  //   }, [])

    const [rows, setRows] = useState([]);

    // GET PARTICIPANTS
    // 1 = GREEN, ready for delivery
    // 3 = SALMON, needs follow-up call
    const fetchRows = async () => {
      const data3 = await axios.get(`${baseUrl}/routesparticipants/status/3`);
      const data5 = await axios.get(`${baseUrl}/participants/status/5`);
      const data = {...data5, ...data3}
      const { participants } = data.data;
      setRows(participants);
      console.log("DATA: ", data);
    };
  
    useEffect(() => {
      fetchRows();
    }, []);

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

  