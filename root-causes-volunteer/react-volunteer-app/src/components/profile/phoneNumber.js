import PhoneInput from 'react-phone-number-input/input';
import React from 'react';
import Grid from '@mui/material/Grid';

// field to input phone number on volunteer profile creation page

const PhoneNumber = () => {
    const [value, setValue] = React.useState('');
    
    return (
            <PhoneInput
                country="US"
                value={value}
                onChange={setValue} />  
    );
}

export default PhoneNumber