import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelectLanguage() {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-language">Non-English Language</InputLabel>
        <Select
          labelId="select-language"
          id="language"
          value={language}
          label="Non-English Language"
          onChange={handleChange}
        >     
            <MenuItem value={"none"}>NONE</MenuItem>
            <MenuItem value={"ASL"}>ASL</MenuItem>
            <MenuItem value={"Arabic"}>Arabic</MenuItem>
            <MenuItem value={"Bangla"}>Bangla</MenuItem>
            <MenuItem value={"Cantonese"}>Cantonese</MenuItem>
            <MenuItem value={"French"}>French</MenuItem>
            <MenuItem value={"German"}>German</MenuItem>
            <MenuItem value={"Greek"}>Greek</MenuItem>
            <MenuItem value={"Hindi"}>Hindi</MenuItem>
            <MenuItem value={"Italian"}>Italian</MenuItem>
            <MenuItem value={"Japanese"}>Japanese</MenuItem>
            <MenuItem value={"Malayalam"}>Malayalam</MenuItem>
            <MenuItem value={"Mandarin"}>Mandarin</MenuItem>
            <MenuItem value={"Marathi"}>Marathi</MenuItem>
            <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
            <MenuItem value={"Pujabi"}>Pujabi</MenuItem>
            <MenuItem value={"Russian"}>Russian</MenuItem>
            <MenuItem value={"Sinhala"}>Sinhala</MenuItem>
            <MenuItem value={"Spanish"}>Spanish</MenuItem>
            <MenuItem value={"Telugu"}>Telugu</MenuItem>
            <MenuItem value={"Swahili"}>Swahili</MenuItem>
            <MenuItem value={"Pujabi"}>Pujabi</MenuItem>
            <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}