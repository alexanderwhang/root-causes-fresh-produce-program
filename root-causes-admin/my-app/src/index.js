import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App,Participants,Individual,AddParticipant, SMSTexts, VolInfo, Callers, Drivers} from './App'; 
import reportWebVitals from './reportWebVitals'; 
import {BrowserRouter,Routes,Route} from "react-router-dom";  



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <>
    <BrowserRouter>   
      <Routes> 
        <Route path ="/" element={<App/>}/>  
        <Route path ="/participants" element={<Participants/>}/> 
        <Route path ="/individual/:id" element={<Individual/>}/> 
        <Route path="/addPt" element={<AddParticipant/>}/>
        <Route path = "/smstexts" element={<SMSTexts/>}/>
        <Route path = "/vol_info" element = {<VolInfo/>}/>
        <Route path ="/callers"   element ={<Callers/>}/> 
        <Route path = "/packers" element = {<Drivers/>}/>
        <Route path ="/drivers"   element ={<Drivers/>}/> 
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
