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
  
  const [open, setOpen] = React.useState(false);
  const [delivery_status, setDeliveryStatus] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setDeliveryStatus(e.target.value);
    console.log(delivery_status);
  }

  function changeBackground1(e) {
    e.target.style.background = "#72bc44";
  }

  function changeBackground2(e) {
    e.target.style.background = "#00743e";
  }

  // const [selectedImage, setSelectedImage] = useState(null);
  // const formData = new FormData();
  
  // const handleChange = (event) => {
  //   console.log(event.target.files[0]);
  //   setSelectedImage(event.target.files[0]);
  //   formData.append('image', event.target.files[0]);
    
  // }
  

  function CheckImage(){
    const [selectedImage, setSelectedImage] = useState(null);
    // const [selectedImage2, setSelectedImage2] = useState(null);
    const handleSubmit = e => {
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
                action="http://127.0.0.1:5000/routes"
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
          
          <Button className="submitImage"
            style={{backgroundColor: "#00743e"}}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
            >
            Submit
          </Button>
          </form>
          
      </div>
      );
    } else {
      return row.image;
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
        <TableCell component="th" scope="row" style={{fontSize: "17px"}}>
          <span style={{fontWeight: "bold", fontSize: "20px"}}> 
          {row.firstname + ' ' + row.lastname} </span> <br /> 
          <a href={"https://maps.google.com/?q=" + row.address} target="_blank">{row.address}</a>
          <br />
          <a href={"tel:" + row.number}>{row.number}</a>
          <br /> Preferred Language: {row.language}
          <br /> Most Recent Delivery Status: {row.delivery_status}
        </TableCell>
        <TableCell>

      <form noValidate method = "post" action="http://127.0.0.1:5000/routes" >
        <input type="hidden" name="id" value={row.id} />
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
          onMouseOver={changeBackground1}
          onMouseOut={changeBackground2}
          >
          Submit
      </Button>
   </form>

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
                      <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key="extra1">
                      <TableCell component="th" scope="row">
                        <FinalNote />
                      </TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                    <TableRow>
                      <TableCell>Image Upload</TableCell>
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

  // axios!
  const [rowsRoutes, setRowsRoutes] = useState([]);
  useEffect(() => {
    axios
    .get('http://127.0.0.1:5000/routes')
    .then((res) => {console.log(res)
       setRowsRoutes(res.data)})
    .catch((err) => {console.log(err)
    })
    }, [])

    const [notesRoutes, setNotesRoutes] = useState([]);
    useEffect(() => {
      axios
      .get('http://127.0.0.1:5000/routes')
      .then((res) => {console.log(res)
         setNotesRoutes(res.data)})
      .catch((err) => {console.log(err)
      })
      }, [])
  
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
          {notesRoutes.map((row) => (
            <Row key={row.id} row={row} />
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}

