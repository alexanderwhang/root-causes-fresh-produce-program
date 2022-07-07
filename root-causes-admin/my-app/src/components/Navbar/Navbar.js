import React, { Component } from 'react';
import { useState } from "react";
import {Link} from "react-router-dom"
import { MenuItems } from "./MenuItems"
import { Button2 } from "../Button2"
import smalllogo from "./small-logo.jpg"
import './Navbar.css'
import Button from '@mui/material/Button';
// import { dropdownItems } from "../dropdownItems";
import Dropdown from "./Dropdown.js";

class Navbar extends Component {
    state = { clicked: false, show: false }
    
    // dropdown = { show: false }


    setDropdown = () => {
        this.setState({ show: !this.state.show})
    }

    // handleEntailmentRequest= () => {
    //      e.preventDefault();
    // }

    // const [dropdown, setDropdown] = useState(false);
    
    // const [value, setValue] = React.useState(0);
    // const [query, setQuery] = useState("");

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className="NavbarItems">
                <a className="navbar-logo" href="/">
                    <img className="navbar-logo" src={smalllogo} />
                </a>
                {/* <img className="navbar-logo" src={smalllogo} /> */}
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                {item.submenu ? (
                                    <>
                                    <Button type="button" aria-haspopup="menu" aria-expanded={this.state.show ? "true" : "false"} onClick= {this.setDropdown}>
                                    <div className={item.cName}>
                                    {item.title}
                                    </div>
                                    </Button>
                                    <Dropdown submenus = {item.submenu} dropdown={this.state.show} id="drop"/>
                                    </>
                                ) : (
                                <Button>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                                </Button>
                                )}
                                {/* <Button variant="contained">Contained</Button> */}
                            </li>
        
                        )
                    })}
                </ul>
                <Button2>Sign In</Button2>
            </nav>
        )
    }
}

export default Navbar