import React, { useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ visible }) => {
  const [open, setOpen] = useState(false);
  const navItem = [
    { id: "nav-text", value: "Home", href: "" },
    { id: "nav-text", value: "About", href: "/about" },
    { id: "nav-text", value: "Contact", href: "/contact" },
    { id: "nav-button", value: "Log In", href: "/login" }
  ];

  const changeStatusNav = () => {
    setOpen(!open);
  };

  const CallNavList = () => {
    return navItem.map((item, index) => {
      const { id, value, href } = item;
      return (
        <li key={index} id={id}>
          <a href={href}>{value}</a>
        </li>
      );
    });
  };

  const handleToolbar = () => {
    if (!visible) {
      return "mobile hide";
    } else if (open) {
      return "mobile show";
    } else {
      return "mobile hide";
    }
  };

  return (
    <div className="header">
      <nav
        className={
          !visible
            ? "stickyNav-active fixed-top navbar-light"
            : "stickyNav-hide"
        }
      >
        <a className={!visible ? "nav-logo" : "hide"} href="/">
          F<span>X</span>
        </a>
        <button
          className={open ? "navbar-toggler open" : "navbar-toggler"}
          id="nav-icon"
          onClick={() => changeStatusNav()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div id="desktop">
          <ul className={!visible ? "desktop-nav-list-item" : "hide"}>
            {CallNavList()}
          </ul>
        </div>
        <div id="innerNav" className={open ? "mobile show" : "mobile hide"}>
          <div id="nav-item" className={open ? "show" : "hide"}>
            <ul className="nav-list-item">{CallNavList()}</ul>
          </div>
        </div>
      </nav>
      <nav className="myNav navbar-light">
        <a className="nav-logo" href="/">
          <span className="logo-F">F</span>H<span className="logo-X">X</span>
          ite
        </a>
        <button
          className={open ? "navbar-toggler open" : "navbar-toggler"}
          id="nav-icon"
          onClick={() => changeStatusNav()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div id="desktop">
          <ul className="desktop-nav-list-item">{CallNavList()}</ul>
        </div>
        <div id="innerNav" className={handleToolbar()}>
          <div id="nav-item" className={open ? "show" : "hide"}>
            <ul className="nav-list-item">{CallNavList()}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default Navbar;
