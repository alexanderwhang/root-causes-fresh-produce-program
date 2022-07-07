import "./Texts.css";
import React from "react";
// import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
// import { FooterContainer } from '../containers/footer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
            <TextField
          id="outlined-textarea"
          label="Message"
          placeholder="Type message here..."
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
        />
        </Box>

        <Button variant="contained"> Confirm Message </Button>
        </div>
        <div className="receiving">
        </div>
        </div>
    );
}
