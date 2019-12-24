import React, { Component } from "react";
class Navbar extends Component {
  state = {
    open: false,
    navItem: [
      { key: 1, id: "nav-text", value: "Home", href: "" },
      { key: 2, id: "nav-text", value: "About", href: "/about" },
      { key: 3, id: "nav-text", value: "Contact", href: "/contact" },
      { key: 4, id: "nav-button", value: "Log In", href: "/login" }
    ]
  };

  changeStatusNav = () => {
    const open = !this.state.open;
    this.setState({ open });
  };

  CallNavList() {
    return this.state.navItem.map(item => {
      const { key, id, value, href } = item;
      return (
        <li key={key} id={id}>
          <a href={href}>{value}</a>
        </li>
      );
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div className="header">
        <nav
          className={
            !this.props.visible
              ? "stickyNav-active fixed-top navbar-light"
              : "stickyNav-hide"
          }
        >
          <a className={!this.props.visible ? "nav-logo" : "hide"} href="/">
            F<span>X</span>
          </a>
          <button
            className={open ? "navbar-toggler open" : "navbar-toggler"}
            id="nav-icon"
            onClick={this.changeStatusNav}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div id="desktop">
            <ul
              className={!this.props.visible ? "desktop-nav-list-item" : "hide"}
            >
              {this.CallNavList()}
            </ul>
          </div>
          <div id="innerNav" className={open ? "mobile show" : "mobile hide"}>
            <div id="nav-item" className={open ? "show" : "hide"}>
              <ul className="nav-list-item">{this.CallNavList()}</ul>
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
            onClick={this.changeStatusNav}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div id="desktop">
            <ul className="desktop-nav-list-item">{this.CallNavList()}</ul>
          </div>
          <div id="innerNav" className={this.handleToolbar()}>
            <div id="nav-item" className={open ? "show" : "hide"}>
              <ul className="nav-list-item">{this.CallNavList()}</ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  handleToolbar() {
    const { open } = this.state;
    if (!this.props.visible) {
      return "mobile hide";
    } else if (open) {
      return "mobile show";
    } else {
      return "mobile hide";
    }
  }
}

export default Navbar;
