import "./Texts.css";
import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { FooterContainer } from '../containers/footer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [status, setStatus] = React.useState('');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Filter</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value={0}>Group A English</MenuItem>
          <MenuItem value={1}>Group A Spanish</MenuItem>
          <MenuItem value={2}>Group B English</MenuItem>
          <MenuItem value={3}>Group B Spanish</MenuItem>
        </Select>
      </FormControl>
      <div className="submitButton">
        <Button variant="outlined">
          Submit
        </Button>
        </div>
    </Box>
  );
}

export function Texts(){
    const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
    return(
        <div>
        <Navbar/>
        <h2>Dial My Calls</h2>
        <div className= "sending">
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <BasicSelect />
          <div className="messageBox">
            <TextField
            id="outlined-textarea"
            label="Message"
            placeholder="Type message here..."
            multiline
            maxRows={4}
            value={value}
            onChange={handleChange}
            />
          </div>
        </Box>
        <div className="confirmMessage">
          <Button variant="contained"> Confirm Message </Button>
        </div>
        </div>
        <div className="receiving">
        </div>
        </div>
    );
}