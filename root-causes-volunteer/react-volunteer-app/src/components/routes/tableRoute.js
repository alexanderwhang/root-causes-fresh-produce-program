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
import RadioButtonsAvailability from './radioDelivered.js';
import FinalNote from '../uploadImages/notes/finalNote.js';
import UploadAndDisplayImage from '../uploadImages/uploadImage.js';
import { useEffect, useState } from "react";
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import '../../styleSheets/tableRoute.css';

const baseUrl = "http://127.0.0.1:5000"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    //This corresponds to the top tab that says 'Destination' and 'Delivery Status'
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
  const {rowNote} = props;
  const [open, setOpen] = React.useState(false);
  const [delivery_status, setDeliveryStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [status_time, setDate] = useState(""); 
  
  // displays date and time of most recent submition of "Delivered" status
  const handleTime = () => {
    let current = new Date();
    let date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    let time = current.toLocaleTimeString();
    setDate(time + " on " + date);
  }

  // handles submit button for delivery status
  const handleSubmit = e => {
    e.preventDefault();
    setDeliveryStatus(e.target.value);
    console.log(delivery_status);
  }

  // handles submit button for notes feature on drop down field
  const handleSubmit2 = e => {
    e.preventDefault();
    setNotes(e.target.value);
    console.log(notes);
    
  }

  // changes the color of submit button when mouse hovers over it
  function changeBackground1(e) {
    e.target.style.background = "#72bc44";
  }

  function changeBackground2(e) {
    e.target.style.background = "#00743e";
  }
  
  // handles uploaded image submission in drop down fields
  function CheckImage(){
    const [selectedImage, setSelectedImage] = useState(null);
    // const [selectedImage2, setSelectedImage2] = useState(null);
    const handleSubmitImage = e => {
     setSelectedImage(e.target.files[0])
    }

    if (row.image == null) {
      return (
        <div>
          <h5 style={{fontSize: "15px"}}>Upload Image Here!</h5>
            {selectedImage && (
            <div>
              <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
            <br />
              <button onClick={()=>setSelectedImage(null)}>Remove</button>
            </div>
            )}

          <form method = "post" 
                action="http://127.0.0.1:5000/image"
                enctype = "multipart/form-data">
            <input
              type="file"
              name="selectedImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
            <input type="hidden" name="id" value={row.id} />
          <br />
          <Button id="note_submit"
            style={{marginTop: "10px"}}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmitImage}
            >
            Submit
          </Button>
          </form> 
      </div>
      );
    } else {
      return (
        <img src={require('../../images-react/' + row.image)} />
        );
    }
  }

  const[notesRoutes, setRoutesNotes] = useState([])
  // GET NOTES
  const fetchNotes = async () => {
    const data = await axios.get(`${baseUrl}/routes/notes/${row.id}`);
    const { notes } = data.data;
    setRoutesNotes(notes);
    console.log("DATA: ", data);
  };
// entire "Routes" page table displaying list of assigned participants and option to set and submit their delivery status for food delivery
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
        <TableCell component="th" scope="row" style={{fontSize: "17px"}}>
          <span style={{fontWeight: "bold", fontSize: "20px"}}> 
          {row.first_name + ' ' + row.last_name} </span> <br /> 
          <a href={"https://maps.google.com/?q=" + row.address} target="_blank">{row.address}</a>
          <br />
          <a href={"tel:" + row.phone}>{row.phone}</a>
          <br /> Preferred Language: {row.language}
          <br /> Most Recent Delivery: {row.most_recent_delivery}
        </TableCell>
        <TableCell>

      <form noValidate method = "post" action="http://127.0.0.1:5000/recent_delivery" >
        <input type="hidden" name="id" value={row.id} />
        <input type="hidden" name="status_time" value={status_time} />
          <FormLabel id="radio-buttons-availability"></FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-availability"
              name="radio-buttons-group"
              >
       <FormControlLabel name = "delivery_status" value="Delivered" control={<Radio />} label="Delivered" />
     </RadioGroup>
     <Button
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
   </form>
  
      {/* drop down menu for individual participants with field for notes and image upload; displays most recent note and notes history */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Delivery Notes / Image Upload
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                      <TableCell>
                      <div id="btn-group">
                      <form noValidate method = "post" action="http://127.0.0.1:5000/routes/notes">
                        <input type="hidden" name="id" value={row.id} />
                        <input style={{ marginRight: '15px' }} type= "text" name="routes_notes" placeholder="Enter notes here..." />
                      <br />
                      <Button id = "note_submit"
                          style={{marginTop: "10px", marginRight: "5px"}}
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onSubmit={handleSubmit2}
                          >
                          Submit
                      </Button>
                      {/* button to delete entire notes history; in future, make only accesible by admin to avoid deleting important information */}
                      {/* <form noValidate method = "post" action="http://127.0.0.1:5000/routes/deletenotes">
                        <input type="hidden" name="id" value={row.id} />
                        <Button id = "note_delete"
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
                <TableBody>
                  <TableRow key="extra1">
                  </TableRow>
                </TableBody>
                <TableHead>
                    <TableRow>
                      <TableCell> <b> Note History </b> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key="extra2">
                      <TableCell component="th" scope="row">
                        {row.delivery_notes}
                      </TableCell>
                  </TableRow>
                </TableBody>


                <TableHead>
                    <TableRow>
                      <TableCell> <b> Image Upload </b> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key="extra2">
                      <TableCell component="th" scope="row">
                        {CheckImage()}
                      </TableCell>
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
    availability: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default function RouteTable() {

  const [rowsRoutes, setRowsRoutes] = useState([]);

  // GET PARTICIPANTS
  const fetchRows = async () => {
    const data = await axios.get(`${baseUrl}/routesparticipants/status/1`);
    const { participants } = data.data;
    setRowsRoutes(participants);
    console.log("DATA: ", data);
  };

  useEffect(() => {
    fetchRows();
  }, []);
  
  // table header
  return (
    <TableContainer 
      component={Paper}
      style={{paddingBottom: '100px'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Destination</StyledTableCell>
            <StyledTableCell>Delivery Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsRoutes.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


