import React from 'react'
import RouteTable from '../components/routes/tableRoute.js';
import '../styleSheets/Routes.css';


const Routes = () => {
  return (
    <div>
      <div className='text-center bg-light'>
        <h1 className='mb-4'>Routes</h1>
      </div>
      <RouteTable />
    </div>
  )
}

export default Routes


