import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  }
  
function FindSundays() {
      var d = new Date();
      var month = d.toLocaleString("en-US", { month: "long" })
      var getTot = daysInMonth(d.getMonth(),d.getFullYear()); //Get total days in a month
      var sat = new Array();   //Declaring array for inserting Saturdays
    
      for(var i=1;i<=getTot;i++){    //looping through days in month
        var newDate = new Date(d.getFullYear(),d.getMonth(),i)
        if(newDate.getDay()==6){   //if Saturday
            sat.push(i);
        }
      }
      return (
        
          <FormLabel id="day-questions" 
            > Please mark your availability: 
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label={month + " " + sat[0]} />
                <FormControlLabel control={<Checkbox />} label= {month + " " + sat[1]} />
                <FormControlLabel control={<Checkbox />} label= {month + " " + sat[2]} />
                <FormControlLabel control={<Checkbox />} label= {month + " " + sat[3]} />
            </FormGroup>  
          </FormLabel>
          
        
      );
  }
  export default FindSundays;