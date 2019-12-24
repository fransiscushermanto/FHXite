import React, { useState, useEffect } from "react";
import "../../css/Admin/navbar.css";

const Navbar = ({ width, RenderNavList }) => {
  return (
    <div className="side-navbar" style={{ zIndex: width === 100 ? "3" : "0" }}>
      <a className="nav-logo" href="/">
        <span className="logo-F">F</span>H<span className="logo-X">X</span>
        ite
      </a>
      <ul className="nav-list">
        <RenderNavList />
      </ul>
    </div>
  );
};

export default Navbar;
