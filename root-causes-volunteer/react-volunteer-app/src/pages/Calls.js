import React from 'react'
import '../styleSheets/Calls.css';
import CustomizedTables from '../components/calls/table';



const Calls = () => {
  return (
    <div>
      <div className='text-center bg-light'>
        <h1 className='mb-4'>Calls</h1>
      </div>
      <CustomizedTables />
    </div>
  )
}

export default Calls