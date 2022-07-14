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
import { styled } from '@mui/material/styles';

export default function BasicSelect() {
  const [status, setStatus] = React.useState('');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <div className="basic-select">
      <Box sx={{ maxWidth: 200,  }}>
      <div className = "filter">
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Filter</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            sx={{backgroundColor: "#f9f8e1" }}
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
        </div>
        <div className="submitButton">
          <Button variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </div>
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
        <div className="sms">
          <div className="box">
          <h4> Sending Messages </h4>
            <div className= "sending">
              <BasicSelect />
              <div className="messaging">
              <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor: "#f9f8e1"},
              }}
              noValidate
              autoComplete="off"
              >
                  <div className="messageBox">
                    <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    placeholder="Type message here..."
                    multiline
                    rows={8}
                    value={value}
                    onChange={handleChange}
                    />
                  </div>
                </Box>
                <div className="confirmMessage">
                  <Button variant="contained"> Confirm Message </Button>
                </div>
              </div>
            </div>
        </div>
        <div className= "box">
          <h4> Receiving Messages </h4>
          <div className="receiving">
            <div className="caught">
            </div>
            <div className="uncaught">
            </div>
          </div>
        </div>
          </div>
            <FooterContainer />
          </div>
    );
}
