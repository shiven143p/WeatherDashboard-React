import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ imgSrc, title } = props) => {
  return (
    <div className="header">
      <div className="title">
        <img src={imgSrc} alt={title} />
        <h1>{title}</h1>
      </div>
      <div className="navlink">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cityselection">City Selection</NavLink>
        <NavLink to="/weatherdashboard">Weather Dashboard</NavLink>
      </div>
    </div>
  );
};

export default Header;
