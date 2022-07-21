import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button2 } from "../Button2"
import smalllogo from "./small-logo.jpg"
import './Navbar.css'
import Button from '@mui/material/Button';
import Dropdown from "./Dropdown.js";


// this file is the only one that contains class declarations rather than functions
class Navbar extends Component {

    // clicked state refers to whether the hamburger menu is clicked or not
    // show state refers to whether the dropdown is showing based on the status of clicked
    state = { clicked: false, show: false }


    // sets the status of dropdown to whether or not it should be showing
    setDropdown = () => {
        this.setState({ show: !this.state.show})
    }

    // sets the statuss of clicked to determine whether a user has clicked on the hamburger menu (smaller display)
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className="NavbarItems">
            {/* contains the root causes logo at the top left of the screen. this logo sends you back to the home page */}
                <a className="navbar-logo" href="/">
                    <img className="navbar-logo" alt="Root Causes Logo" src={smalllogo} />
                </a>
                {/* this is used when the screen window is made smaller and the hamburger menu appears
                    when the hamburger menu is clicked, it uses this state to style and determine display options */}
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                </div>
                {/* if clicked, it shows all of the menu items.*/}
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {/* maps through every menu item */}
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                            {/* if menu item has a submenu, then it is shown only if the show state is set to true (when clicked) */}
                                {item.submenu ? (
                                    <>
                                    {/* menu item display. does not have a link, when clicked, only the submenu pops up. no redirection */}
                                    <Button type="button" aria-haspopup="menu" aria-expanded={this.state.show ? "true" : "false"} onClick= {this.setDropdown}>
                                    <div className={item.cName}>
                                    {item.title}
                                    </div>
                                    </Button>
                                    {/* submenu item display with links to appropriate pages */}
                                    <Dropdown submenus = {item.submenu} dropdown={this.state.show} id="drop"/>
                                    </>
                                ) : (
                                // if there is no submenu, then it only displays the menu item and makes it link to the appropriate page
                                <Button>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                                </Button>
                                )}
                            </li>
        
                        )
                    })}
                </ul>
                {/* sign in button: currently does not have any functionality, but in the future user authentication
                    should be implemented into the app, and the sign in button will be replaced by a log out button when a user
                    has successfully logged in.  */}
                <Button2>Sign In</Button2>
            </nav>
        )
    }
}

export default Navbar