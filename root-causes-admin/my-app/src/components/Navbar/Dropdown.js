import React from "react";
import {Link} from "react-router-dom";

const Dropdown = ({ submenus, dropdown }) => {
 return (
   <ul className={`dropdown ${dropdown ? "show" : ""}`}>
   {submenus.map((submenu, index) => (
    <li key={index} className="menu-items">
        <div className="dropdown-content">
     <Link to={submenu.url} className ={submenu.cName}>{submenu.title}</Link>
    </div>
    </li>
   ))}
  </ul>
 );
};

export default Dropdown;

