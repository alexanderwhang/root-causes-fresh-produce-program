 // USED IN TEXTS.SMS
  // Component for participants whose texts are more complicated
  // for the API to sort, so these will have to be manually changed

import React from "react";
import "../pages/Texts.css";
import SvgEllipse from "../symbolComponents/Ellipse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import MenuItem from "@mui/material/MenuItem";
// import { Container, Wrapper, Row, Column, Link, Title } from './styles/footer'

// const baseUrl = "http://127.0.0.1:5000";
const baseUrl = "http://localhost:5000";

export function Uncaught_Participants() {
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(true);

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

    const handleClick = () => {
    setOpen(!open);
    };

    return (
      <div>
        <ListItemButton onClick={handleClick}>
          <SvgEllipse id="text_status"/>
          <ListItemText primary=" Pt" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className= "sublist">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Message" />
                  <Box sx={{ width:100, maxWidth: 300 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-status-label">Status</InputLabel>
                        <Select
                          labelId="simple-select-label"
                          id="simple-select"
                          sx={{backgroundColor: "#f9f8e1" }}
                          value={status}
                          label="Status"
                          onChange={handleStatusChange}
                        >
                          <MenuItem value={0}>No Status Set</MenuItem>
                          <MenuItem value={1}>Ready for Delivery</MenuItem>
                          <MenuItem value={2}>Not This Week</MenuItem>
                          <MenuItem value={3}>Requires Follow Up</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
              </ListItemButton>
            </List>
          </Collapse>
          </div>
    );
}