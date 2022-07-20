import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// drop down menu for volunteer affiliation on profile creation page

export default function BasicSelect() {
  const [affiliation, setAffiliation] = React.useState('');

  const handleChange = (event) => {
    setAffiliation(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-affiliation">Duke Affiliation</InputLabel>
        <Select
          labelId="select-affiliation"
          id="affiliation"
          value={affiliation}
          label="Duke Affiliation"
          onChange={handleChange}
        >
          <MenuItem value={"duke_undergrad"}>Duke Undergrad</MenuItem>
          <MenuItem value={"duke_schoolofmed"}>Duke School of Medicine</MenuItem>
          <MenuItem value={"duke_fuqua"}>Duke Fuqua School of Business</MenuItem>
          <MenuItem value={"duke_law"}>Duke School of Law</MenuItem>
          <MenuItem value={"duke_nicholas"}>Duke Nicholas School of the Environment</MenuItem>
          <MenuItem value={"duke_sanford"}>Duke Sanford School of Public Policy</MenuItem>
          <MenuItem value={"duke_pratt"}>Duke Pratt School of Engineering</MenuItem>
          <MenuItem value={"duke_emergencymed"}>Duke Emergency Medicine</MenuItem>
          <MenuItem value={"duke_ghi"}>Duke Global Health Institute</MenuItem>
          <MenuItem value={"duke_alum"}>Duke Alum</MenuItem>
          <MenuItem value={"duke_sa"}>Duke Student Affairs</MenuItem>
          <MenuItem value={"duke_athlethics"}>Duke Athletics</MenuItem>
          <MenuItem value={"duke_facstaff"}>Duke Faculty/Staff</MenuItem>
          <MenuItem value={"duke_trinity"}>Trinity School of Arts and Sciences</MenuItem>
          <MenuItem value={"meredith"}>Meredith College</MenuItem>
          <MenuItem value={"jldoc"}>JLDOC</MenuItem>
          <MenuItem value={"activategood"}>Activate Good</MenuItem>
          <MenuItem value={"duke_alum"}>Duke Alum</MenuItem>
          <MenuItem value={"connectcommunity"}>Connect Community</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

