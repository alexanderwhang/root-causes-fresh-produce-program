import React from "react";
import {Link} from "react-router-dom";

// dropdown holds the caller and driver management page in the nav bar
// drodown styling is currently hardcoded so it does not look good on all screens. 
// it should be centered right below "volunteer management" regardless of the screen size.
const Dropdown = ({ submenus, dropdown }) => {
 return (
   <ul className={`dropdown ${dropdown ? "show" : ""}`}>
   {/* maps through submenus in MenuItems.js to determine what goes in the dropdown*/}
    {submenus.map((submenu, index) => (
      <li key={index} className="menu-items">
          <div className="dropdown-content">
      {/*  links to the url held by a submenu item  */}
      <Link to={submenu.url} className ={submenu.cName}>{submenu.title}</Link>
      </div>
      </li>
    ))}
  </ul>
 );
};

export default Dropdown;

