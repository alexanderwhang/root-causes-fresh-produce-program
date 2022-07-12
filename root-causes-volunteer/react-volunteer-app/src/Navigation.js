import React, {useState, useEffect} from 'react';
import './styleSheets/navigation.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from './noWordsTanSmall_logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faHome, faUserCircle, faCar, faPhone, faFileLines } from '@fortawesome/free-solid-svg-icons';
// import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';



const tabs = [{
  route: "/home",
  icon: faHome,
  label: "Home"
},{
  route: "/profile",
  icon: faAddressCard,
  label: "Register"
},{
  route: "/",
  icon: faUserCircle,
  label: "Login"
}, {
  route: "/routes",
  icon: faCar,
  label: "Routes"
}, {
    route: "/calls",
    icon: faPhone,
    label: "Calls" 
}, {
  route: "/signup",
  icon: faFileLines,
  label: "SignUp"
}
]

const Navigation = (props) => {

  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/home">
                    <img src={logo} /> 
            </a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/profile" className="nav-link">
                  <button className="navButton"> Register </button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" className="nav-link">
                  <button className="navButton"> Login </button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/routes" className="nav-link">
                  <button className="navButton"> Routes </button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/calls" className="nav-link">
                  <button className="navButton"> Calls </button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup" className="nav-link">
                  <button className="navButton"> Sign Up </button>
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
    
    <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
      <Nav className="w-100">
        <div className="d-flex flex-row justify-content-around w-100">
          {
            tabs.map((tab, index) =>(
              <NavItem key={`tab-${index}`}>
                <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                  <div className="row d-flex flex-column justify-content-center align-items-center"
                      >
                    <FontAwesomeIcon size="lg" color='#009a4b' icon={tab.icon} />
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
    </nav>
    
    </div>
  )
};

export default Navigation;


